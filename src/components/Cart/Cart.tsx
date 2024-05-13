import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Text from 'components/Text';
import isImgUrl from 'configs/isImgUrl';
import rootStore from 'store/RootStore/instance';
import emptyCart from "../../assets/emptyCart.svg"
import img from "../../assets/imgSoon.jpg"
import styles from "./Cart.module.scss";


function Cart() {
  const products = rootStore.cart.cart

  if (products.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <Text>Корзина пуста</Text>
        <img src={emptyCart} className={styles.cartEmptyImg} />
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
              <svg width="30px" height="30px" className={styles.cartRemoveItem}
                onClick={() => rootStore.cart.deleteElement(id)}
                viewBox="0 0 1024 1024" fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="" />
                <path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="" />
              </svg>
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
