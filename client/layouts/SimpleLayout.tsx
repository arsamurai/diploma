import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/images/logo.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import telegram from "../assets/images/telegram.png";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="simple-header">
        <div className="container container--spec">
          <Link href="/" className="simple-header__logo">
            <Image src={logo} alt="logo" className="simple-header__logo-img" />
          </Link>
        </div>
      </div>
      <div className="container container--spec">{children}</div>
      <div className="simple-footer">
        <div className="container container--spec">
          <div className="simple-footer__inner">
            <ul className="social">
              <li className="social-item">
                <a href="#" className="social-item__link">
                  <Image src={facebook} alt="facebook" className="icon" />
                  <span>facebook</span>
                </a>
              </li>
              <li className="social-item">
                <a href="#" className="social-item__link">
                  <Image src={instagram} alt="instagram" className="icon" />
                  <span>instagram</span>
                </a>
              </li>
              <li className="social-item">
                <a href="#" className="social-item__link">
                  <Image src={telegram} alt="telegram" className="icon" />
                  <span>telegram</span>
                </a>
              </li>
            </ul>
            <ul className="contacts">
              <li className="contacts-item">
                <a href="tel:+380997580121" className="contacts-item__link">
                  +380997580121
                </a>
              </li>
              <li className="contacts-item">
                <a href="tel:+380997580121" className="contacts-item__link">
                  +380997580121
                </a>
              </li>
              <li className="contacts-item">
                <a href="musienko.com" className="contacts-item__link">
                  musienko.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleLayout;
