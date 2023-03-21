import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import image from "../../assets/images/default.jpeg";
import cn from "classnames";
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
          {types.map((type) => {
            return (
              <li key={type.name} className="main-catalog__list-item">
                <Link href={"/" + type.value} className="main-catalog__list-link">
                  <Image src={image} alt="link" />
                  <span>{type.name}</span>
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
