import Image from "next/image";
import React, { useEffect } from "react";
import image from "../../../assets/images/default.jpeg";
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
        {types.map((type) => {
          return (
            <li key={type.name} className="catalog__list-item">
              <Link href={"/" + type.value} className="catalog__list-link">
                <Image src={image} alt="link" />
                <span>{type.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Сatalog;