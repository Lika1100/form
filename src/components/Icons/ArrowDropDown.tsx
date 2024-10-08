import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const ArrowDropDown: React.FC<IconProps> = ({ width = 20, height = 20, color = 'secondary', className}) => {
  return (
    <BasicIcon 
      width={width}
      height={height}
      className={className}
    >
      <path d="M6.175 6.53333L10 10.35L13.825 6.53333L15 7.70833L10 12.7083L5 7.70833L6.175 6.53333Z" fill={color}/>
      <path d="M6.175 6.53333L10 10.35L13.825 6.53333L15 7.70833L10 12.7083L5 7.70833L6.175 6.53333Z" fill="black" fillOpacity="0.25"/>
    </BasicIcon>
  );
};

export default ArrowDropDown;
