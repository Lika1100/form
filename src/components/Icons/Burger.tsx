import cn from "classnames"
import * as React from "react";
import { IconProps } from "./ArrowDropDown";

const BurgerIcon: React.FC<IconProps> = ({ width = 30, height = 30, className, color = "primary", ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            className={cn(className)}
            width={width} height={height}
            {...props}
        >
            <path d="M4 18L20 18" style={{ stroke: `var(--text-${color}` }} strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12L20 12" style={{ stroke: `var(--text-${color}` }} strokeWidth="2" strokeLinecap="round" />
            <path d="M4 6L20 6" style={{ stroke: `var(--text-${color}` }} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

export default BurgerIcon;