import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import searchIcon from "../../../assets/images/icons/search-icon.png";
import microphone from "../../../assets/images/icons/microphone.png";
import basketIcon from "../../../assets/images/icons/basket-btn.png";
import catalogIcon from "../../../assets/images/icons/catalog.png";
import logo from "../../../assets/images/logo.png";
import Button from "../Buttons/Button";
import { BasketModal, LoginModal, CatalogModal, SideBar } from "..";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";
import Search from "./Search";

const Header: React.FC = () => {
	const { auth } = useActions();

  const [activeBasket, setActiveBasket] = useState(false);
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeCatalog, setActiveCatalog] = useState(false);
  const [activeSideBar, setActiveSideBar] = useState(false);
  const { isAuth, user } = useTypedSelector(state => state.user);
  const isAdmin = !!user?.roles?.find(role => role.value === 'ADMIN');

	useEffect(() => {
		auth();
	}, [user])


	const loginHandler = () => {
    setActiveLogin(true);
  };
	
	const catalogHandler = () => {
    setActiveCatalog(true);
  };

  const basketHandler = () => {
    setActiveBasket(true);
  };
	
  const sideBarHandler = () => {
    setActiveSideBar(true);
  };

  let buttons = isAuth ? (
    <>
      <button className="header__basket" onClick={basketHandler}>
        <Image className="basket-img" src={basketIcon} alt="basket" />
      </button>
      <Link href="/account" className="header__account-link">
				{ user.login }
      </Link>
      {isAdmin && (
        <Link href="/admin" className="header__admin-link">
          Admin
        </Link>
      )}
    </>
  ) : (
    <button
      className="header__account-btn"
      onClick={loginHandler}
    >
			<svg className="account-img" width="24" height="24" viewBox="0 0 24 24"><path d="M11,10V12H10V14H8V12H5.83C5.42,13.17 4.31,14 3,14A3,3 0 0,1 0,11A3,3 0 0,1 3,8C4.31,8 5.42,8.83 5.83,10H11M3,10A1,1 0 0,0 2,11A1,1 0 0,0 3,12A1,1 0 0,0 4,11A1,1 0 0,0 3,10M16,14C18.67,14 24,15.34 24,18V20H8V18C8,15.34 13.33,14 16,14M16,12A4,4 0 0,1 12,8A4,4 0 0,1 16,4A4,4 0 0,1 20,8A4,4 0 0,1 16,12Z" /></svg>
    </button>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="burger" onClick={sideBarHandler}>
            <div className="burger__menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="header__left">
            <Link href="/" className="header__logo">
              <Image src={logo} alt="logo" className="header__logo-img" />
            </Link>
            <div className="header__catalog">
              <Button outlined className="header__catalog-btn" onClick={catalogHandler}>
                <Image
                  src={catalogIcon}
                  alt="catalog"
                  className="catalog-icon"
                />
                <span>Каталог</span>
              </Button>
            </div>
          </div>
					<Search />
          <div className="header__settings">
            <ul className="languages">
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
            {buttons}
          </div>
        </div>
      </div>
			<SideBar activeSideBar={activeSideBar} setActiveSideBar={setActiveSideBar} setActiveBasket={setActiveBasket} setActiveLogin={setActiveLogin} setActiveCatalog={setActiveCatalog}  />
      <BasketModal active={activeBasket} setActive={setActiveBasket} />
      <LoginModal active={activeLogin} setActive={setActiveLogin} />
      <CatalogModal active={activeCatalog} setActive={setActiveCatalog} />
    </header>
  );
};

export default Header;
