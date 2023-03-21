import React from "react";
import cn from "classnames";

interface PageTitleProps {
  index: number,
	activePage: number;
  openPage: (e: any) => void;
	title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ index, activePage, openPage, title }) => {
  return (
    <li
			data-index={index}
      onClick={openPage}
      className={cn("page-title", {active: index === activePage})}
    >
      {title}
    </li>
  );
};

export default PageTitle;
