import * as React from 'react';
export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
  children?: React.ReactNode;
};

const BasicIcon: React.FC<IconProps> = ({ children, ...props }) => {
  return <svg {...props}>{children}</svg>;
};

export default BasicIcon;
