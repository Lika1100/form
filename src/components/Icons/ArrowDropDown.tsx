import * as React from "react";
import cn from "classnames"

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const ArrowDropDown: React.FC<IconProps> = ({ width = 25, height = 25, className, color = "secondary", ...props }) => {
    return (
        <svg width={width} height={height}
            viewBox="0 0 25 24"
            fill="none" xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
            {...props}
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.83563 8.74738L4.16436 7.25256L12.5 14.662L20.8356 7.25256L22.1644 8.74738L12.5 17.3379L2.83563 8.74738Z"
                style={{ fill: `var(--text-${color}` }} />
        </svg>
    )
}

export default ArrowDropDown;