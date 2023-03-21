import React, { MouseEventHandler } from "react";
import cn from "classnames";

interface ButtonProps {
	className?: string,
	outlined?: boolean,
	violet?: boolean,
	simplified?: boolean,
	error?: boolean,
	disabled?: boolean,
	type?: "button" | "submit",
	onClick?: MouseEventHandler<HTMLButtonElement>,
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({className, outlined, violet, simplified, error, disabled, type="button", onClick, children}) => {
  return (
    <button
		 	type={type}
      onClick={onClick}
      className={cn("button", className, {
        "button--simplified": simplified,
        "button--outlined": outlined,
        "button--violet": violet,
        "button--error": error,
        "button--disabled": disabled,
      })}
    >
      {children}
    </button>
  );
}

export default Button;
