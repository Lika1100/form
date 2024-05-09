import { useState } from 'react';
import deleteSvg from "../../assets/delete.svg"
import emptyCart from "../../assets/emptyCart.svg"
import img from "../../assets/imgSoon.jpg"
import { ProductModel } from 'store/models/products';
import { Count, addProducts } from 'utils/CartEvents/addProducts';
import { deleteElement } from 'utils/CartEvents/deleteElement';
import { readProducts } from 'utils/CartEvents/readProducts';
import { removeElement } from 'utils/CartEvents/removeElement';
import styles from "./Cart.module.scss";
import * as React from 'react';

export default function Cart() {
  const products:(ProductModel & Count)[] = readProducts();
  const [, setCount] = useState(1)
  const [, setIsDelete] = useState(false)
  function onAdd(item: (ProductModel & Count)) {
    setCount(prev => prev + 1)
    addProducts(item)
  }
  function onRemove(item: (ProductModel & Count)) {
    setCount(prev => prev - 1)
    removeElement(item)
  }
  function onDelete(item: (ProductModel & Count)) {
    setIsDelete(prev => !prev)
    deleteElement(item)
  }

  if (products.length === 0) {
    return (
        <div className={styles.cartEmpty}>
        <p>Корзина пуста</p>
        <img src={emptyCart} className={styles.cartEmptyImg}/>
        </div>
    )
  }

  const total = products.map(({price=1, count}) => price!*count).reduce((prev=1, acc=1) => prev + acc, 0)

  return (
    <div className={styles.cart}>
        {products.map(({id, title, price = 1, images, count, category, description}) => {
            return (
                <div key={id} className={styles.cartItem}>
                    <img src={images[0]} className={styles.cartImg} onError={({currentTarget}) => {
                        currentTarget.src = img
                    }}/>
                    <p className={styles.cartTitle}>{title}</p>
                    <div className={styles.cartCounter}>
                        <button className={styles.cartCounterButton} 
                          onClick={() => onRemove({price, title, count, images, id, category, description})}
                          disabled={count === 1 ? true : false}
                        >
                            -
                        </button>
                            <span className={styles.cartCounterNum}>{count}</span>
                        <button
                          onClick={() => onAdd({price, title, count, images, id, category, description})} 
                          className={styles.cartCounterButton}>
                            +
                        </button>
                    </div>
                    <div className={styles.cartRight}>
                      <p className={styles.cartPrice}>{price!*count}$</p>
                      <img src={deleteSvg}
                        onClick={() => onDelete({price, title, count, images, id, category, description})} 
                        className={styles.cartRemoveItem}/>
                    </div>
                </div>
            )
        })}
        <div className={styles.cartFooter}>
            <p>Total sum {total}$</p>
        </div>
    </div>
  )
}
