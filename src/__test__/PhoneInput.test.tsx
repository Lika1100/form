import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import PhoneInput from '../App/PhoneInput';
import { ALL_PREFIXES, PHONE_LENGTH } from '../configs/constants';
import { FormStatus } from '../store/local/FormStore/types';
import { Prefix } from '../store/models/prefix/type';

import '@testing-library/jest-dom';

type Props = {
  formStatus: FormStatus;
};

const WrappedPhoneInput: React.FC<Props> = ({ formStatus }) => {
  const [value, setValue] = useState<Prefix>(ALL_PREFIXES[0]);

  const options = {
    formStatus: formStatus,
    onChange: () => {},
    formattedPhone: ['(', '9', '9', '9', ')', '1', '1', '1', '-', '2', '2', '-', '3', '3'],
  };

  const prefixStore = {
    allPrefixes: ALL_PREFIXES,
    defaultPrefix: value,
    setPrefix: setValue,
  };
  return <PhoneInput {...options} prefixStore={prefixStore} />;
};

describe('Тестирование компонента PhoneInput', () => {
  test('отображается dropdown и ячейки ввода, дродаун открывается при клике и закрывается при клике вне', async () => {
    render(
      <>
        <button data-testid="outside">some</button>
        <WrappedPhoneInput formStatus={FormStatus.default} />
      </>,
    );

    const user = userEvent.setup();

    const baseCells = screen.getAllByTestId('base-cell');

    expect(baseCells.length).toBe(PHONE_LENGTH);

    const firstCellDropdownElement = screen.getByTestId('button-dropdown');

    expect(firstCellDropdownElement).toBeInTheDocument();

    await user.click(firstCellDropdownElement);

    const dropdownList = screen.getByTestId('list-dropdown');

    expect(dropdownList).toBeVisible();

    const outside = screen.getByTestId('outside');
    await user.click(outside);

    expect(dropdownList).not.toBeInTheDocument();
  });

  test('отображается dropdown, меняется значение в дропдауне', async () => {
    render(<WrappedPhoneInput formStatus={FormStatus.default} />);

    const user = userEvent.setup();

    const firstCellDropdownElement = screen.getByTestId('button-dropdown');

    expect(firstCellDropdownElement).toBeInTheDocument();

    await user.click(firstCellDropdownElement);

    const dropdownList = screen.getByTestId('list-dropdown');
    const dropDownItems = screen.getAllByTestId('list-item');

    expect(dropdownList).toBeVisible();

    await user.click(dropDownItems[2]);

    expect(dropdownList).not.toBeVisible();
    expect(firstCellDropdownElement).toHaveTextContent(ALL_PREFIXES[2].prefix);
  });

  test('отображается dropdown и ячейки ввода, formState = disabled, dropdown не открывается, инпуты задизейблены', async () => {
    render(<WrappedPhoneInput formStatus={FormStatus.disabled} />);

    const baseCells = screen.getAllByTestId('base-cell');

    expect(baseCells.length).toBe(PHONE_LENGTH);

    const firstCellDropdownElement = screen.getByTestId('button-dropdown');

    expect(firstCellDropdownElement).toBeInTheDocument();
    expect(firstCellDropdownElement).toBeDisabled();
    expect(baseCells[0]).toBeDisabled();
  });

  test('пользователь может вводить данные в ячейку и и стирать', async () => {
    render(<WrappedPhoneInput formStatus={FormStatus.default} />);

    const user = userEvent.setup();

    const baseCells = screen.getAllByTestId('base-cell');

    expect(baseCells.length).toBe(PHONE_LENGTH);

    const firstCellDropdownElement = screen.getByTestId('button-dropdown');

    expect(firstCellDropdownElement).toBeInTheDocument();

    await user.click(baseCells[0]);
    await user.keyboard('0');

    expect(baseCells[0]).toHaveFocus();
    expect(baseCells[0]).toHaveValue('0');

    await user.type(baseCells[0], '[Backspace]');

    expect(baseCells[0]).toHaveFocus();
    expect(baseCells[0]).not.toHaveValue('0');
  });

  test('formStatus = error, отображается предупреждение', async () => {
    render(<WrappedPhoneInput formStatus={FormStatus.error} />);

    const baseCells = screen.getAllByTestId('base-cell');
    const firstCellDropdownElement = screen.getByTestId('button-dropdown');
    const errorStub = screen.getByTestId('error-stub');

    expect(baseCells.length).toBe(PHONE_LENGTH);
    expect(firstCellDropdownElement).toBeInTheDocument();
    expect(errorStub).toBeInTheDocument();
  });

  test('formStatus = success, отображается предупреждение', async () => {
    render(<WrappedPhoneInput formStatus={FormStatus.success} />);

    const baseCells = screen.getAllByTestId('base-cell');
    const firstCellDropdownElement = screen.getByTestId('button-dropdown');
    const successStub = screen.getByTestId('success-stub');

    expect(baseCells.length).toBe(PHONE_LENGTH);
    expect(firstCellDropdownElement).toBeInTheDocument();
    expect(successStub).toBeInTheDocument();
  });
});
