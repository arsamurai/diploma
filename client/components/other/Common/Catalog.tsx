import React, { useEffect } from "react";
import Link from "next/link";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";

const Сatalog: React.FC = () => {
	const { fetchTypes } = useActions();
	const {types} = useTypedSelector(state => state.types)

	useEffect(() => {
    fetchTypes();
	}, [])

  return (
    <div className="catalog">
      <ul className="catalog__list">
        {types.map((type, index) => {
          return (
            <li key={type.name} className="catalog__list-item">
              <Link href={"/" + type.value} className="catalog__list-link">
                <span className="catalog__item-num">{index + 1})</span>
                <span className="catalog__item-name">{type.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Сatalog;