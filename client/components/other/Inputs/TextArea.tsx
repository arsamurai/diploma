import { ChangeEvent, FocusEvent } from 'react';
import cn from 'classnames';

interface TextAreaProps {
	maxLength?: number;
	name?: string;
	placeholder?: string;
	label?: string;
	labelClass?: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string | number;
	message?: string;
	className?: string;
	touched?: boolean;
	onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
	rows?: number;
}
const TextArea:React.FC<TextAreaProps> = ({
	maxLength,
	className,
	name,
	placeholder,
	label,
	labelClass,
	value,
	onChange,
	message,
	onBlur,
	touched,
	rows
}) => {
	return (
		<div className={cn("textarea__wrapper", className)}>
			{label &&
				<label className={cn("textarea__label", labelClass)}>{label}</label>
			}
			<textarea className={cn("textarea", {"mt-5": label}, { error: touched && message })}
				maxLength={maxLength ?? 100}
				rows={rows}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}/>
			{touched && message &&
				<div className="input-error-message">{message}</div>
			}
		</div>
	)
}
export default TextArea;