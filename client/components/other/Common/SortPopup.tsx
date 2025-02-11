import React, { RefObject, useRef, useState } from "react";
import cn from "classnames";
import { IBrand } from "../../../models/IBrand";

interface SortPopupProps {
	title: string,
	activeItem: string,
  onSelectSortBy: (object: object) => void,
	sortItems: IBrand[] | IBrand[],
	sortRef: RefObject<any>,
	className: string
}

const SortPopup: React.FC<SortPopupProps> = React.memo(function SortPopup({
	title,
  activeItem,
  onSelectSortBy,
	sortItems,
	sortRef,
	className
}) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const activeLable = sortItems?.find((obj) => obj.value === activeItem)?.name;

  const onSelectItem = (object: object) => {
    onSelectSortBy(object);
    setVisiblePopup(false);
  };

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (e: any) => {
    if(!e.composedPath().includes(sortRef?.current)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    }
  }, []);

  return (
    <div className={cn("sort", className && className)} ref={sortRef}>
      <div className={cn("sort__label", { active: visiblePopup })}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>{ title }</b>
        <span onClick={toggleVisiblePopup}>{activeLable}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {
              sortItems.map((obj, index) => (
                <li
                  className={cn({active: activeItem === obj.value})}
                  onClick={() => onSelectItem(obj)}
                  key={`${obj.value}_${index}`}
                >
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;