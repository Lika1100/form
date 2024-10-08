import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const SuccessIcon: React.FC<IconProps> = ({ width = 16, height = 16, className }) => {
  return (
    <BasicIcon width={width} height={height} className={className}>
      <path
        d="M8.00001 1.33331C4.32001 1.33331 1.33334 4.31998 1.33334 7.99998C1.33334 11.68 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99998C14.6667 4.31998 11.68 1.33331 8.00001 1.33331ZM6.66668 11.3333L3.33334 7.99998L4.27334 7.05998L6.66668 9.44665L11.7267 4.38665L12.6667 5.33331L6.66668 11.3333Z"
        fill="#3CC13B"
      />
    </BasicIcon>
  );
};

export default SuccessIcon;
