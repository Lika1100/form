import cn from 'classnames';
import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const CartIcon: React.FC<IconProps> = ({ width = 30, height = 30, className, color = 'primary', ...props }) => {
  return (
    <BasicIcon
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill='none'
      {...props}
    >
      <path
        d="M9.375 9.58751V8.37501C9.375 5.56251 11.6375 2.80001 14.45 2.53751C17.8 2.21251 20.625 4.85001 20.625 8.13751V9.86251"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 27.5H18.75C23.775 27.5 24.675 25.4875 24.9375 23.0375L25.875 15.5375C26.2125 12.4875 25.3375 10 20 10H10C4.66253 10 3.78753 12.4875 4.12503 15.5375L5.06253 23.0375C5.32503 25.4875 6.22503 27.5 11.25 27.5Z"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.3694 15H19.3806"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6181 15H10.6294"
        style={{ stroke: `var(--text-${color}` }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BasicIcon>
  );
};

export default CartIcon;
