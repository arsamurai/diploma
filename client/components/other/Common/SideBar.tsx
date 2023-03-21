import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import Button from "../Buttons/Button";
import image from "../../../assets/images/default.jpeg";
import logo from "../../../assets/images/logo.png";
import catalogIcon from "../../../assets/images/icons/catalog.png";
import basketIcon from "../../../assets/images/icons/basket-btn.png";
import accountIcon from "../../../assets/images/icons/account.svg";
import facebook from "../../../assets/images/facebook.png";
import instagram from "../../../assets/images/instagram.png";
import telegram from "../../../assets/images/telegram.png";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

interface SideBarProps {
  activeSideBar: boolean;
  setActiveSideBar: (e?: any) => void;
  setActiveBasket: (e?: any) => void;
  setActiveLogin: (e?: any) => void;
  setActiveCatalog: (e?: any) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  activeSideBar,
  setActiveSideBar,
	setActiveBasket,
	setActiveLogin,
	setActiveCatalog
}) => {
  const history = useRouter();
	const { isAuth, user } = useTypedSelector(state => state.user);

  const isAdmin = !!user?.roles?.find(role => role.value === 'ADMIN');

  const closeSidebar = () => {
    setActiveSideBar(false);
  };

  const loginHandler = () => {
    setActiveLogin(true);
		closeSidebar();
  };

  const basketHandler = () => {
    setActiveBasket(true);
		closeSidebar();
  };

  const catalogHandler = () => {
    setActiveCatalog(true);
		closeSidebar();
  };

  const accountHandler = () => {
    history.push("/account");
  };

  const adminHandler = () => {
    history.push("/admin");
  };

  const accountBtn = isAuth ? (
    <Button violet className="sidebar__account-btn" onClick={accountHandler}>
      <Image src={image} alt="person" className="icon" />
      <span>{ user.name } { user.surname }</span>
    </Button>
  ) : (
    <Button className="sidebar__login-btn" onClick={loginHandler}>
			<svg width="24" height="24" viewBox="0 0 24 24"><path d="M11,10V12H10V14H8V12H5.83C5.42,13.17 4.31,14 3,14A3,3 0 0,1 0,11A3,3 0 0,1 3,8C4.31,8 5.42,8.83 5.83,10H11M3,10A1,1 0 0,0 2,11A1,1 0 0,0 3,12A1,1 0 0,0 4,11A1,1 0 0,0 3,10M16,14C18.67,14 24,15.34 24,18V20H8V18C8,15.34 13.33,14 16,14M16,12A4,4 0 0,1 12,8A4,4 0 0,1 16,4A4,4 0 0,1 20,8A4,4 0 0,1 16,12Z" /></svg>
      <span>Увійти</span>
    </Button>
  );

  return (
    <div className={cn("sidebar", { active: activeSideBar })} onClick={closeSidebar}>
      <div className="sidebar__body" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar__top">
          <Link href="/" className="sidebar__logo">
            <Image src={logo} alt="logo" className="header__logo-img" />
          </Link>
          <div className="sidebar__close" onClick={closeSidebar}>
            <span>×</span>
          </div>
        </div>
        <ul className="sidebar__list">
          <li className="sidebar__list-item">{accountBtn}</li>
          {isAdmin && (
            <li className="sidebar__list-item">
              <Button
                violet
                className="sidebar__admin-btn"
                onClick={adminHandler}
              >
                Адмін
              </Button>
            </li>
          )}
          <li className="sidebar__list-item">
            <Button outlined className="sidebar__catalog-btn" onClick={catalogHandler}>
              <Image src={catalogIcon} alt="catalog" className="catalog-icon" />
              <span>Каталог</span>
            </Button>
          </li>
          {isAuth && (
            <li className="sidebar__list-item">
              <Button outlined className="sidebar__basket-btn" onClick={basketHandler}>
                <Image
                  src={basketIcon}
                  alt="basket"
                  className="basket-img icon"
                />
                <span>Кошик</span>
              </Button>
            </li>
          )}
          <li className="sidebar__list-item sidebar__list-item--languages">
            <div className="sidebar__languages-wrapper">
              <h5 className="sidebar__languages-title">Мова:</h5>
              <ul className="languages sidebar__languages">
                <li className="language en selected">
                  <a href="#" className="language-link">
                    en
                  </a>
                </li>
                <li className="language ua disabled">
                  <a href="#" className="language-link">
                    ua
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="sidebar__list-item">
            <ul className="sidebar__social">
              <li className="sidebar__social-item">
                <a href="#" className="sidebar__social-item__link">
                  <Image src={facebook} alt="facebook" className="icon" />
                  <span>facebook</span>
                </a>
              </li>
              <li className="sidebar__social-item">
                <a href="#" className="sidebar__social-item__link">
                  <Image src={instagram} alt="instagram" className="icon" />
                  <span>instagram</span>
                </a>
              </li>
              <li className="sidebar__social-item">
                <a href="#" className="sidebar__social-item__link">
                  <Image src={telegram} alt="telegram" className="icon" />
                  <span>telegram</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="sidebar__list-item">
            <ul className="sidebar__contacts">
              <li className="sidebar__contacts-item">
                <a
                  href="tel:+380997580121"
                  className="sidebar__contacts-item__link"
                >
                  +380997580121
                </a>
              </li>
              <li className="sidebar__contacts-item">
                <a
                  href="tel:+380997580121"
                  className="sidebar__contacts-item__link"
                >
                  +380997580121
                </a>
              </li>
              <li className="sidebar__contacts-item">
                <a href="musienko.com" className="sidebar__contacts-item__link">
                  musienko.com
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
