import { action, computed, makeObservable, observable } from 'mobx';
import { ProductModel } from 'store/models/products';

type Count = {
  count: number;
};
export type CartProps = ProductModel & Count;

type PrivateFields = '_cart' | '_sum' | '_amountOfProducts';

type CardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  count: number;
};

export default class CartStore {
  private _cart: CardProps[] = [];
  private _sum: number = 0;
  private _amountOfProducts = 0;
  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cart: observable.ref,
      _sum: observable,
      _amountOfProducts: observable,
      amountOfProducts: computed,
      sum: computed,
      cart: computed,
      upDateCart: action
    });
  }

  get sum() {
    return this._sum
  }

  get amountOfProducts() {
    return this._amountOfProducts
  }

  get cart(): CardProps[] {
    return this._cart;
  }

  upDateCart(event: CardProps[]) {
    this._cart = [...event];
  }

  getSum() {
    this._sum = this._cart
      .map(({count, price}) => count*price)
      .reduce((a, b) => a + b, 0)
      return this._sum
  }

  getAmountOfProducts() {
    this._amountOfProducts = this._cart
      .map(({count}) => count)
      .reduce((a, b) => a + b, 0)
    return this._amountOfProducts
  }

  destroy() {}
}
