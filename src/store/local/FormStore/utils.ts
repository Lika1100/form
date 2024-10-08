import { PHONE_LENGTH } from 'configs/constants';

export const isValidPhoneNumber = (phoneNumber: string[]) => {
  const isValidLength = phoneNumber.length === PHONE_LENGTH;
  const isAllNumbers = phoneNumber.every((num) => !isNaN(+num));

  return isValidLength && isAllNumbers;
};
