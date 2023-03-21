import { ChangeEvent, FocusEvent, useState } from "react";
import cn from "classnames";
import eyeOpen from "../../../assets/images/icons/eye_open.png";
import eyeHide from "../../../assets/images/icons/eye_hide.png";
import Image from "next/image";

interface PasswordInputProps {
  className?: string;
  labelClass?: string;
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  message?: string;
}
const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  label,
  name,
  value,
  onBlur,
  onChange,
  touched,
  message,
  labelClass,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);

  const showPasswordHandler = () => {
    toggleShowPassword((prevState) => !prevState);
  };

  return (
    <div className={cn("input__wrapper password-input__wrapper", className)}>
      {label && (
        <label className={cn("input__label", labelClass)}>{label}</label>
      )}
      <input
        className={cn(
          "input",
          { "mt-5": label },
          { error: touched && message }
        )}
        name={name}
        value={value}
        type={showPassword ? "text" : "password"}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="*******"
        autoComplete="false"
      />
      <div className="eye">
        {showPassword ? (
          <Image
            src={eyeHide}
            alt="eye-svg"
            className="eye-hide"
            onClick={showPasswordHandler}
          />
        ) : (
          <Image
            src={eyeOpen}
            alt="eye-svg"
            className="eye-open"
            onClick={showPasswordHandler}
          />
        )}
      </div>
      {touched && message && <div className="input__error">{message}</div>}
    </div>
  );
};
export default PasswordInput;
