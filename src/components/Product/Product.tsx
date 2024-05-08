import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/Button";
import Loader from "components/Loader";
import RelatedItems from "components/RelatedItems";
import Text from "components/Text";
import { API_ENDPOINTS } from "configs/baseUrl";
import useNavigatePages from "configs/useNavigatePages";
import ItemStore from "store/ItemStore";
import { addProducts } from "utils/CartEvents/addProducts";
import { useLocalStore } from "utils/useLocalStore";
import img from "../../assets/imgSoon.jpg"
import styles from "./Product.module.scss";
import * as React from "react";
import arrow from "../../assets/arrow.svg"
import { Meta } from "utils/meta";


const Product = () => {
    const { productId = "1" } = useParams();
    const { backToProducts } = useNavigatePages()
    
    const productStore = useLocalStore(() => new ItemStore())

    useEffect(() => {
        productStore.getItem(API_ENDPOINTS.PRODUCTS, `${productId}`)
    }, [productStore, productId])


    const {meta, item} = productStore
    
    if (meta === Meta.initial || meta === Meta.loading) {
        return <Loader size="l" className={styles.card__loader} />
    }

    return (
        <>
            {meta === "success" && (
                <div className={styles.card} key={item.id}>
                    <button onClick={backToProducts} className={styles.card__arrow}>
                    </button>
                    <img className={styles.card__image} 
                      src={item.images[0]} alt="card" 
                      onError={({currentTarget}) => {currentTarget.src = img}}
                    />
                    <div className={styles.card__titleContainer}>
                        <Text view='title' maxLines={2} weight='bold' color='primary' tag="h2">
                            {item.title}
                        </Text>
                        <Text view='p-20' maxLines={3} color="secondary">
                            {item.description}
                        </Text>
                        <Text view='title' weight='bold' tag="h2">
                            {`$${item.price}`}
                        </Text>
                        <div className={styles.card__footerButtons}>
                            <Button disabled={false} className={""}>Buy now</Button>
                            <button className={styles.card__button} disabled={false} onClick={() => addProducts({...item, count: 1})}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <RelatedItems categoryId={item.category!.id}/>
        </>
    )
}

export default observer(Product)
