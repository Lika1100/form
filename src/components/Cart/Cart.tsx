import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import { Link } from 'react-router-dom';
import DeleteIcon from 'components/Icons/DeleteIcon';
import EmptyCart from 'components/Icons/EmptyCart';
import Text from 'components/Text';
import addToCart from 'configs/add';
import deleteFromCart from 'configs/deleteFromCart';
import isImgUrl from 'configs/isImgUrl';
import removeFromCart from 'configs/removeFromCart';
import rootStore from 'store/RootStore/instance';
import img from '../../assets/imgSoon.jpg';
import pay from '../../assets/pay.png';
import styles from './Cart.module.scss';

function Cart() {
  const { getAll, update, deleteRecord, add, getByID } = useIndexedDB('cart');

  const cart = rootStore.cart.cart;
  const total = rootStore.cart.getSum()

  if (cart.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <Text>Корзина пуста</Text>
        <EmptyCart className={styles.cartEmptyImg} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        {cart.map(({ id, title, price, image, count }) => {
          const imageValid = isImgUrl(image) ? image : img;
          return (
            <div key={id} className={styles.cartItem}>
              <img src={imageValid} className={styles.cartImg} />
              <Text className={styles.cartTitle} view="p-20">
                {title}
              </Text>
              <div className={styles.cartCounter}>
                <button
                  className={styles.cartCounterButton}
                  onClick={() => removeFromCart({ id, title, price, image, count, update, getByID, getAll })}
                  disabled={count === 1}
                >
                  -
                </button>
                <Text className={styles.cartCounterNum} view="p-18">
                  {count}
                </Text>
                <button
                  onClick={() =>
                    addToCart({ price, title, count, image: imageValid, id, add, update, getByID, getAll })
                  }
                  className={styles.cartCounterButton}
                >
                  +
                </button>
              </div>
              <div className={styles.cartRight}>
                <Text weight="bold">{+price * +count}$</Text>
                <DeleteIcon
                  className={styles.cartRemoveItem}
                  onClick={() => deleteFromCart({ id, deleteRecord, getAll })}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/payment" className={styles.cartFooter}>
        <img src={pay} alt="" className={styles.cartImgPay} />
        <Text>Click hear and start shopping right now</Text>
        <Text weight="bold">Total {total}$</Text>
      </Link>
    </div>
  );
}

export default observer(Cart);
