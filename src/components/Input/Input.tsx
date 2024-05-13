import cn from "classnames";
import React from "react";
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
        ...props
    }) => {
        return (
            <div>
                <input
                    {...props}
                    name="input"
                    type="text"
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