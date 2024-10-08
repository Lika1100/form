import { action, computed, makeObservable, observable } from 'mobx';
import { DEFAULT_PLACEHOLDER, PHONE_LENGTH } from 'configs/constants';
import { ILocalStore } from 'configs/useLocalStore';
import { PrefixStore } from '../shared/PrefixStore';
import { FormStatus } from './types';
import { isValidPhoneNumber } from './utils';

export class FormStore implements ILocalStore {
  readonly prefixStore = new PrefixStore();

  private _defaultPlaceholder = DEFAULT_PLACEHOLDER;

  private _inputValues: string[] = Array.from(Array(PHONE_LENGTH).fill('-'));

  targetIndex = 0;

  formStatus: FormStatus = FormStatus.default;

  get formattedPhone() {
    return this.formatNumber('7892223   3*18');
  }

  constructor() {
    makeObservable(this, {
      formattedPhone: computed,

      onFocus: action.bound,
      onKeyDown: action.bound,
      onSubmit: action.bound,
      onChange: action.bound,
      formatNumber: action.bound,

      formStatus: observable,
    });
  }

  onFocus() {
    const inputs = document.querySelectorAll('input');

    const activeElement = document.activeElement;

    inputs.forEach((input, i) => {
      if (input === activeElement) {
        this.targetIndex = i;
      }
    });
  }

  onKeyDown() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(
      (inp) =>
        (inp.onkeydown = (e) => {
          if (e.code === 'ArrowRight') {
            if (this.targetIndex === PHONE_LENGTH - 1) {
              this.targetIndex = PHONE_LENGTH - 1;
            } else {
              this.targetIndex++;
            }

            inputs[this.targetIndex] && inputs[this.targetIndex].focus();
          }

          if (e.code === 'ArrowLeft' || e.code === 'Backspace') {
            if (this.targetIndex === 0) {
              this.targetIndex = 0;
            } else {
              this.targetIndex--;
            }

            inputs[this.targetIndex] && inputs[this.targetIndex].focus();
          }

          if (e.code === 'Enter') {
            this.onSubmit();
          }
        }),
    );
  }

  onSubmit() {
    const isValid = isValidPhoneNumber(this._inputValues);
    isValid ? (this.formStatus = FormStatus.success) : (this.formStatus = FormStatus.error);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this._inputValues[this.targetIndex] = e.target.value;
  }

  formatNumber(number?: string) {
    if (!number) {
      return this._defaultPlaceholder
        .replace(/\D/g, '')
        .replace(/(\D{3})(\D{3})(\D{2})(\D{2})/gi, '($1)-$2-$3-$4')
        .split('');
    } else {
      return number
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1)-$2-$3-$4')
        .split('');
    }
  }

  destroy(): void {
    //do noth
  }
}
