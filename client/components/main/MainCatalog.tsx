import React, { useEffect } from "react";
import Link from "next/link";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useAction";

const MainСatalog: React.FC = () => {
	const { fetchTypes } = useActions();
	const { types } = useTypedSelector(state => state.types)

	useEffect(() => {
  	fetchTypes();
	}, [])
	
  return (
    <div className="main-catalog">
      <div className="main-catalog__inner">
        <ul className="main-catalog__list">
          {types.map((type, index) => {
            return (
              <li key={type.name} className="main-catalog__list-item">
                <Link href={"/" + type.value} className="main-catalog__list-link">
                  <span className="main-catalog__item-num">{index + 1})</span>
                  <span className="main-catalog__item-name">{type.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainСatalog;
