import React from "react";
import { Header, Footer } from "../components/other";
import cn from "classnames";

interface MainLayoutProps {
  children: React.ReactNode;
	device?: boolean
	specContainer?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, device, specContainer }) => {
  return (
    <>
      <Header />
      <div className={cn("container", {"spec-container": specContainer})}>
        <div className="wrapper">{children}</div>
      </div>
      <Footer device={device} />
    </>
  );
};

export default MainLayout;
