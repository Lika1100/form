import cn from "classnames";
import * as React from 'react';
import Loader from "components/Loader";
import styles from "./Button.module.scss";


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean
    children: React.ReactNode
    className: string
    disabled: boolean,
    onClick?: () => void
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, onClick }): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className)}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading && <Loader size='s' color="#fff" />}
            {children}
        </button>
    )
};

export default Button;