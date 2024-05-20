import { makeAutoObservable } from 'mobx';
import isValidEmail from 'configs/isValidEmail';
import isValidPassword from 'configs/isValidPassword';
import { statusAuth } from 'store/RootStore/AuthStore/AuthStore';
import rootStore from 'store/RootStore/instance';

type PrivateFields = '_isError' | '_message';

export default class InputStore { 
  _isError: boolean = false
  private _message: string = ""
  constructor() {
    makeAutoObservable<InputStore, PrivateFields>(this);
  }

  get isError() {
    return this._isError;
  }

  get message() {
    return this._message;
  }

  getMessage(email: string, password: string) {
    let result = "Please check your"
    if (!isValidEmail(email)) {
        result += " email"
    }
    if (!isValidPassword(password)) {
        result += " password"
    } 
    if (rootStore.userStore.authStatus === statusAuth.auth) {
        result = ""
    } 
    if (isValidEmail(email) && isValidPassword(password) && rootStore.userStore.authStatus !== statusAuth.auth) {
        result = "Sorry, you are not authorized"
    }
    return result
  }
  

  destroy() {}
}
