import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const ErrorIcon: React.FC<IconProps> = ({ width = 16, height = 16, className }) => {
  return (
    <BasicIcon width={width} height={height} className={className}>
      <path
        d="M0.666656 14H15.3333L7.99999 1.33331L0.666656 14ZM8.66666 12H7.33332V10.6666H8.66666V12ZM8.66666 9.33331H7.33332V6.66665H8.66666V9.33331Z"
        fill="#F03738"
      />
    </BasicIcon>
  );
};

export default ErrorIcon;
