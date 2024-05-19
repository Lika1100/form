import cn from 'classnames';
import * as React from 'react';
import { IconProps } from './ArrowDropDown';

const CloseIcon: React.FC<IconProps> = ({ width = 30, height = 30, className, color = 'primary', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      className={cn(className)}
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 21.32L21 3.32001"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3.32001L21 21.32"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
