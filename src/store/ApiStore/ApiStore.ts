import axios, { AxiosResponse } from "axios";
import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "utils/useLocalStore";

type privateFields = "_baseUrl"

export default class ApiStore implements ILocalStore {
  private _baseUrl: string = ""
  constructor() {
    makeObservable<ApiStore, privateFields>(this, {
      _baseUrl: observable,
      baseUrl: computed,
      get: action
    })
  }

  get baseUrl() {
    return this._baseUrl
  }

  async get<T>(endpoint: string) {
    this._baseUrl = endpoint
    const response: AxiosResponse<T> = await axios.get(this._baseUrl);
    return response;
  }

  destroy(): void {}
}