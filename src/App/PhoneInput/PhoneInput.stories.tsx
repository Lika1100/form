import React, { useState } from 'react';
import '../../styles/styles.css';
import { ALL_PREFIXES } from '../../configs/constants';
import { FormStatus } from '../../store/local/FormStore/types';
import { Prefix } from '../../store/models/prefix';
import PhoneInput, { IFormStore } from './PhoneInput';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
  argTypes: {
    className: {
      control: 'text',
    },
    formStatus: {
      type: 'string',
      description: 'Status',
      options: ['default', 'success', 'error', 'disabled'],
      control: {
        type: 'radio',
      },
    },
  }
}

const options = {
  formStatus: FormStatus.default,
  onChange: () => {},
  formattedPhone: ['(', '9', '9', '9', ')', '1', '1', '1', '-', '2', '2', '-', '3', '3'],
}

export const PhoneInputComponent = (props: IFormStore) => {
  const [value, setValue] = useState<Prefix>(ALL_PREFIXES[0]);

  const prefixStore = {
    allPrefixes: ALL_PREFIXES,
    defaultPrefix: value,
    setPrefix: setValue,
  }

  return (
    <PhoneInput 
      formattedPhone={options.formattedPhone} 
      prefixStore={prefixStore} 
      onChange={options.onChange} 
      formStatus={props.formStatus}
      onKeyDown={props.onKeyDown}
    />
  )
}