import cn from 'classnames';
import * as React from 'react';
import './BaseCell.css';
import { FormStatus } from '../../../store/local/FormStore/types';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  status?: FormStatus;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

// eslint-disable-next-line react/display-name
const BaseCell = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    id,
    placeholder = '1', 
    type = 'text', 
    status = "default",
    onChange,
    ...props 
  }) => {
  return (
    <input
      {...props}
      id={id}
      type={type}
      maxLength={1}
      disabled={status === FormStatus.disabled}
      placeholder={placeholder}
      className={cn(className, 'baseCell', `baseCell_${status}`)}
      onChange={onChange}
      data-testid='base-cell'
    />
  );
});

export default React.memo(BaseCell);
