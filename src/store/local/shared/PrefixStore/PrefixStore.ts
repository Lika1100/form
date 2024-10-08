import { action, makeObservable, observable } from 'mobx';
import { ALL_PREFIXES } from 'configs/constants';
import { Prefix } from 'store/models/prefix';

export class PrefixStore {
  allPrefixes = ALL_PREFIXES;
  defaultPrefix = ALL_PREFIXES[0];

  constructor() {
    makeObservable(this, {
      allPrefixes: observable.ref,
      defaultPrefix: observable.ref,
      setPrefix: action.bound,
    });
  }

  setPrefix(value: Prefix) {
    this.defaultPrefix = value;
  }
}
