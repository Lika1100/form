import * as React from "react";
import cn from "classnames"

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const CloseIcon: React.FC<IconProps> = ({ width = 30, height = 30, className, color = "primary", ...props }) => {
    return (
        <svg width={width} height={height} className={cn(className)} viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3 21.32L21 3.32001" style={{ stroke: `var(--text-${color}` }} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 3.32001L21 21.32" style={{ stroke: `var(--text-${color}` }} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default CloseIcon;