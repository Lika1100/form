/* eslint-disable @typescript-eslint/no-explicit-any */
import rootStore from 'store/RootStore/instance';

type indexDeleteProps = {
  id: number;
  deleteRecord: (key: number | string) => Promise<any>;
  getAll: <T = any>() => Promise<T[]>;
};
function deleteFromCart({ id, deleteRecord, getAll }: indexDeleteProps) {
  deleteRecord(id);

  getAll().then((cartData) => {
    rootStore.cartStore.upDateCart(cartData);
  });
}

export default deleteFromCart;
