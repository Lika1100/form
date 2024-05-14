import cn from "classnames";
import * as React from "react";
import styles from "./Input.module.scss"

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
> & {
    value: string;
    onChange: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        value,
        onChange,
        className,
        disabled,
        placeholder = "text",
        type = "text",
        ...props
    }) => {
        return (
            <div>
                <input
                    {...props}
                    type={type}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={cn(className, styles.input)}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </div>
        )
    });

export default Input;