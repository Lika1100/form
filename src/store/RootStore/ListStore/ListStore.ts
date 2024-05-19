import { action, computed, makeObservable, observable } from 'mobx';
import { ProductModel } from 'store/models/products';

type PrivateFields = '_fullList';

export default class ListStore {
  private _fullList: ProductModel[] = [];

  constructor() {
    makeObservable<ListStore, PrivateFields>(this, {
      _fullList: observable.ref,
      fullList: computed,
      getEmptyList: action,
      getUniqList: action,
    });
  }

  get fullList(): ProductModel[] {
    return this._fullList;
  }

  getUniqList(list: ProductModel[]) {
    this._fullList.push(...list);
    const uniqIds = new Set();
    return this._fullList.filter((x) => {
      const isDuplicate = uniqIds.has(x.id);

      uniqIds.add(x.id);
      return !isDuplicate;
    });
  }

  getEmptyList() {
    this._fullList = [];
    return this._fullList;
  }

  destroy() {}
}
