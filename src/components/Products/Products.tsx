import { observer } from "mobx-react-lite";
import Card from "components/Card";
import { ProductModel } from "store/models/products";
import styles from "./Products.module.scss"
import * as React from "react";


type ProductsProps = {
    list: ProductModel[],
}

const Products = ({list}: ProductsProps) => {
    return (
    <div className={list.length >= 9 ? styles.scrollableDiv : ""}>
      <div className={styles.cards} id="scrollableDiv">
        {list
            .map(({ price, images, description, id, title, category }) => {
                return (
                    <div key={id}>
                        <Card price={price!} images={images} id={id}
                            category={category!}
                            description={description!} title={title!}
                            key={id} className={styles.cards__item}
                        />
                    </div>
                )
        })}
      </div>
    </div>   
    )
}

export default observer(Products)

