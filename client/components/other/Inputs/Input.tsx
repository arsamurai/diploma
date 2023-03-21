import { ChangeEvent, FocusEvent, useLayoutEffect, useRef } from "react";
import cn from "classnames";

interface NameInputProps {
  maxLength?: number;
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string;
	labelClass?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  message?: string;
  className?: string;
  touched?: boolean;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  nonAutoComplete?: boolean;
  forceFocus?: boolean;
}
const NameInput: React.FC<NameInputProps> = ({
  maxLength,
  className,
  type,
  name,
  placeholder,
  label,
	labelClass,
  value,
  onChange,
  message,
  onBlur,
  touched,
  disabled,
  nonAutoComplete = false,
  forceFocus,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // useLayoutEffect(() => {
  //   setTimeout(() => {
  //     if (document.activeElement?.getAttribute("name") !== "search-input") {
  //       inputRef?.current?.focus();
  //     }
  //   }, 20);
  // }, [forceFocus]);

  return (
    <div className={cn("input__wrapper", className)}>
      {label && (
        <label className={cn("input__label", labelClass)}>{label}</label>
      )}
      <input
        className={cn("input", {"mt-5": label}, { error: touched && message })}
        name={name}
        //autoFocus
        ref={inputRef}
        type={type ?? "text"}
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? ""}
        placeholder={placeholder}
        maxLength={maxLength ?? 50}
        disabled={disabled ?? false}
        autoComplete={nonAutoComplete ? "off" : "on"}
      />
      {touched && message && <div className="input__error">{message}</div>}
    </div>
  );
};
export default NameInput;
