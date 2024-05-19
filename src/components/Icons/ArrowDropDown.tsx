import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const ArrowDropDown: React.FC<IconProps> = ({ width = 25, height = 25, color = 'secondary', className}) => {
  return (
    <BasicIcon 
      width={width}
      height={height}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83563 8.74738L4.16436 7.25256L12.5 14.662L20.8356 7.25256L22.1644 8.74738L12.5 17.3379L2.83563 8.74738Z"
        style={{ fill: `var(--text-${color}` }}
      />
    </BasicIcon>
  );
};

export default ArrowDropDown;
