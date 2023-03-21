import React, { useRef, useState } from "react";
import { SortPopup } from "../other";
import { wrapper } from "../../store";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import cn from "classnames";
import { IBrand } from "../../models/IBrand";
import { useActions } from "../../hooks/useAction";

interface BrandListProps {
  activeItem: string;
  onSelectBrand: (brand: IBrand) => void;
}

const BrandList: React.FC<BrandListProps> = React.memo(function BrandList({
  activeItem,
  onSelectBrand,
}) {

	const brandListRef = useRef(null);
	const { brands } = useTypedSelector(state => state.filters);
  const { setOffset } = useActions();

	const [visiblePopup, setVisiblePopup] = useState(false);
  const activeLable = brands.find(brand => brand.value === activeItem)?.name;

  const onSelectItem = (brand: IBrand) => {
    setOffset(0);
    onSelectBrand(brand);
    setVisiblePopup(false);
  };

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (e: any) => {
    if(!e.composedPath().includes(brandListRef?.current)) {
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
		<div className="sort brands-list" ref={brandListRef}>
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
        <b>Бренд</b>
        <span onClick={toggleVisiblePopup}>{activeLable}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {
              brands.map((brand, index) => (
                <li
                  className={cn({active: activeItem === brand.value})}
                  onClick={() => onSelectItem(brand)}
                  key={`${brand.value}_${index}`}
                >
                  {brand.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default BrandList;
