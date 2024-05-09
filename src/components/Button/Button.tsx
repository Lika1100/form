import cn from "classnames";
import * as React from 'react';
import Loader from "components/Loader";
import styles from "./Button.module.scss";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    children: React.ReactNode
    className?: string
    disabled?: boolean,
    onClick?: () => void,
    view?: "green" | "white"
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled = false, onClick, view = "green", ...props }): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, styles[`${view}`])}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && <Loader size='s' color="#fff" />}
            {children}
        </button>
    )
};

export default Button;