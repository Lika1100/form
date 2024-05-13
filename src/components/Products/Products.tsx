import { observer } from "mobx-react-lite";
import * as React from "react";
import Card from "components/Card";
import { ProductModel } from "store/models/products";
import styles from "./Products.module.scss"


type ProductsProps = {
    list: ProductModel[],
}

const Products = ({list}: ProductsProps) => {
    return (
      <div className={styles.cards}>
        {list
            .map(({ price, images, description, id, title, category }) => {
                return (
                    <div key={id}>
                        <Card price={price!} images={images} id={id}
                            category={category!}
                            description={description!} title={title!}
                            key={id} className={styles.cardsItem}
                        />
                    </div>
                )
        })}
      </div> 
    )
}

export default observer(Products)

