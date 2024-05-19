/* eslint-disable @typescript-eslint/no-explicit-any */
import rootStore from 'store/RootStore/instance';

export type indexProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  count?: number;
  update: <T = any>(value: T, key?: any) => Promise<any>;
  add: <T = any>(value: T, key?: any) => Promise<number>;
  getAll: <T = any>() => Promise<T[]>;
  getByID: <T = any>(id: string | number) => Promise<T>;
};

function addToCart({ title, price, image, id, getByID, add, update, getAll }: indexProps) {
  getByID(id).then((res) => {
    if (res === undefined) {
      add({ title, price, image, id, count: 1 });
    } else {
      update({ id, price, title, image, count: res.count + 1 });
    }
    getAll().then((res) => {
      rootStore.cart.upDateCart(res);
    });
  });
}

export default addToCart;
