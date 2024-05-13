import { makeAutoObservable } from "mobx";
import { ProductModel } from "store/models/products";


type Count = {
  count: number
}
export type CartProps = ProductModel & Count;

type PrivateFields = "_cart";

export default class CartStore {
  private _cart: CartProps[] = []
  constructor() {
    makeAutoObservable<CartStore, PrivateFields>(this)
  }

  get cart(): CartProps[] {
    return this._cart
  }

  addProduct(product: CartProps) {
    const newEvent: CartProps = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      category: product.category,
      description: product.description,
      count: 1
    };
    const ids = this._cart.map((x) => x.id)
    if (ids.includes(product.id)) {
      for (const event of this._cart) {
        if (event.id === product.id) {
          event.count += 1
        }
      }
    } else {
      this._cart = [...this._cart, newEvent]
    }
  }
  removeElement(id: number) {
    for (const event of this._cart) {
      if (event.id === id) {
        event.count -= 1
      }
    }
  }

  deleteElement(id: number) {
    this._cart = this._cart.filter((x) => x.id !== id)
  }
  destroy() { }
}