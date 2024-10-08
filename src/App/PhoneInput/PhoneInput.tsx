import { observer } from 'mobx-react-lite';
import * as React from 'react';

import ErrorIcon from '../../components/Icons/ErrorIcon';
import SuccessIcon from '../../components/Icons/SuccessIcon';
import BaseCell from '../../components/shared/BaseCell';
import FirstCellDropdown from '../../components/shared/FirstCellDropdown';

import { FormStatus } from '../../store/local/FormStore/types';
import { Prefix } from '../../store/models/prefix/type';

import './PhoneInput.css';

export type IFormStore = {
  onKeyDown?: () => void;
  onFocus?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  formattedPhone: string[];
  formStatus: FormStatus;
  prefixStore: IPrefixStore;
};

type IPrefixStore = {
  allPrefixes: Prefix[];
  defaultPrefix: Prefix;
  setPrefix: (value: Prefix) => void;
}

const PhoneInput: React.FC<IFormStore> = ({ onKeyDown, onFocus, formattedPhone, formStatus, onChange, prefixStore }) => {
  return (
    <div className='content'>
      <div className='content__title'>Введите номер телефона</div>
      <div className='content__phone'>
        <FirstCellDropdown 
          allPrefixes={prefixStore.allPrefixes} 
          defaultPrefix={prefixStore.defaultPrefix}
          setPrefix={prefixStore.setPrefix}
          formStatus={formStatus}
        />
        <div className='content__inputs'>
          {formattedPhone?.map((x, i) => {
            return !isNaN(+x) 
              ? <BaseCell status={formStatus} key={i} id={`${i}`} onChange={onChange} onKeyDown={onKeyDown} onFocus={onFocus} placeholder={x} /> 
              : <span key={i}>{x}</span>
          })}
        </div>
      </div>
      {formStatus === FormStatus.error && <div data-testid='error-stub' className='content__alert'><ErrorIcon /> Неправильный номер телефона</div>}
      {formStatus === FormStatus.success && <div data-testid='success-stub' className='content__alert'><SuccessIcon /> Номер телефона введен верно</div>}
    </div>
  )
};

export default observer(PhoneInput);
