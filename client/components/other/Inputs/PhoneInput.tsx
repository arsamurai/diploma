import { ChangeEvent, FocusEvent } from "react";
import InputMask from "react-input-mask";
import cn from "classnames";

type PhoneInputType = {
  name?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string;
  message?: string;
  touched?: boolean;
  label?: string;
};

const PhoneInput = ({
  name,
  className,
  onChange,
  value,
  message,
  touched,
  onBlur,
  label,
}: PhoneInputType) => {
  return (
    <div className={cn("input__wrapper", className)}>
      {label && <label className="input__label">{label}</label>}
      <InputMask
        className={cn(
          "input phone-input",
          { "mt-5": label },
          { error: touched && message }
        )}
        name={name}
        mask={"+38(099)-999-9999"}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ""}
      />
      {touched && message && <div className="input__error">{message}</div>}
    </div>
  );
};

export default PhoneInput;
