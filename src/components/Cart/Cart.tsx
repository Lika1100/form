import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import isImgUrl from 'configs/isImgUrl';
import rootStore from 'store/RootStore/instance';
import img from "../../assets/imgSoon.jpg"
import styles from "./Cart.module.scss";
import DeleteIcon from 'components/Icons/DeleteIcon';
import EmptyCart from 'components/Icons/EmptyCart';


function Cart() {
  const products = rootStore.cart.cart

  if (products.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <Text>Корзина пуста</Text>
        <EmptyCart className={styles.cartEmptyImg} />
      </div>
    )
  }

  const total = products
    .map(({ price, count }) => price !== null ? price * count : 0)
    .reduce((acc, prev) => acc + prev, 0)

  return (
    <div className={styles.cart}>
      {products.map(({ id, title, price = 1, images, count, category, description }) => {
        const imgUrl = images[0]
        return (
          <div key={id} className={styles.cartItem}>
            <img src={isImgUrl(imgUrl) ? imgUrl : img} className={styles.cartImg} />
            <Text className={styles.cartTitle} view='p-20'>
              {title}
            </Text>
            <div className={styles.cartCounter}>
              <button className={styles.cartCounterButton}
                onClick={() => rootStore.cart.removeElement(id)}
                disabled={count === 1}
              >
                -
              </button>
              <Text className={styles.cartCounterNum} view='p-18'>{count}</Text>
              <button
                onClick={() => rootStore.cart.addProduct({ price, title, count, images, id, category, description })}
                className={styles.cartCounterButton}>
                +
              </button>
            </div>
            <div className={styles.cartRight}>
              <Text weight='bold'>{price! * count}$</Text>
              <DeleteIcon
                className={styles.cartRemoveItem}
                onClick={() => rootStore.cart.deleteElement(id)}
              />
            </div>
          </div>
        )
      })}
      <div className={styles.cartFooter}>
        <Text view='title' weight='bold'>Total sum {total}$</Text>
      </div>
    </div>
  )
}

export default observer(Cart)
