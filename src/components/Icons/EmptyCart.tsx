import cn from 'classnames';
import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const EmptyCart: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <BasicIcon
      className={cn(className)}
      {...props}
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(3.401)">
        <path d="m23 46c3.863 0 7 3.137 7 7s-3.137 7-7 7-7-3.137-7-7 3.137-7 7-7zm18 0c3.863 0 7 3.137 7 7s-3.137 7-7 7-7-3.137-7-7 3.137-7 7-7zm-18 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm18 0c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm-28-27h40.198l-4.363 24h-22.835v-2h21.165l3.637-20h-37.604l3.637 20h3.165v2h-4.835l-4.165-24v-7h-7v-2h9zm11 22h-2v2h2zm7.828-11.75 5.121-5.25 1.708 1.75-5.122 5.25 5.122 5.25-1.708 1.75-5.121-5.25-5.121 5.25-1.707-1.75 5.121-5.25-5.121-5.25 1.707-1.75z"></path>
      </g>
    </BasicIcon>
  );
};

export default EmptyCart;
