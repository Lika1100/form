import { action, computed, makeObservable, observable } from "mobx";
import { ProductModel } from "store/models/products";


type Count = {
  count: number
}
export type CartProps = ProductModel & Count;

type PrivateFields = "_cart";

type CardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  count: number;
};

export default class CartStore {
  private _cart: CardProps[] = []
  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _cart: observable.ref,
      cart: computed,
      upDateCart: action
    })
  }

  get cart(): CardProps[] {
    return this._cart
  }

  upDateCart(event: CardProps[]) {
    this._cart = [...event]
  }

  destroy() { }
}