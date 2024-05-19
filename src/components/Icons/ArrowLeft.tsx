import * as React from 'react';
import BasicIcon, { IconProps } from './BasicIcon';

const ArrowLeft: React.FC<IconProps> = ({ width = 30, height = 30, className, color = 'primary', ...props}) => {
  return (
    <BasicIcon
      className={className}
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
        style={{ fill: `var(--text-${color}` }}
      />
    </BasicIcon>
  );
};

export default ArrowLeft;
