import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useRef } from 'react';
import { Prefix } from 'store/models/prefix';
import ArrowDropDown from '../../Icons/ArrowDropDown';
import { useOutsideClick } from '../../../configs/useOutsideClick';
import { FormStatus } from '../../../store/local/FormStore/types';

import './FirstCellDropdown.css';
import Item from './Item';

export type Props = {
  allPrefixes: Prefix[];
  defaultPrefix: Prefix;
  formStatus: FormStatus;
  setPrefix: (value: Prefix) => void;
}

const FirstCellDropdown: React.FC<Props> = ({ allPrefixes, defaultPrefix, formStatus, setPrefix }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, close);

  return (
    <div ref={wrapperRef}>
      <button
        data-testid="button-dropdown" 
        onClick={toggle} 
        disabled={formStatus === FormStatus.disabled} 
        className={cn('root__button', formStatus, isOpen && 'root__button_open')}
      >
        {defaultPrefix.emoji}{defaultPrefix.prefix}
        <ArrowDropDown
          className='root__arrow'
        />
      </button>
      {isOpen && formStatus !== FormStatus.disabled && <div data-testid="list-dropdown" className='root__list'>
         {allPrefixes
          .map((prefix) => {
            return (
              <Item key={prefix.key} prefixItem={prefix} onClose={close} setPrefix={setPrefix}/>
            );
          })}
      </div>}
    </div>
  );
}

export default observer(FirstCellDropdown);
