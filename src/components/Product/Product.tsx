import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import Card from "components/Card";
import Loader from "components/Loader";
import RelatedItems from "components/RelatedItems";
import { API_ENDPOINTS } from "configs/baseUrl";
import useNavigatePages from "configs/useNavigatePages";
import ItemStore from "store/ItemStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import styles from "./Product.module.scss";


const Product = () => {
    const { productId = "1" } = useParams();
    const { backToProducts } = useNavigatePages()

    const productStore = useLocalStore(() => new ItemStore())

    useEffect(() => {
        productStore.getItem(`${productId}`)
    }, [productStore, productId])

    const { meta, item } = productStore



    if (meta === Meta.initial || meta === Meta.loading) {
        return <Loader size="l" className={styles.cardLoader} />
    }

    return (
        <>
            {meta === "success" && (
                <div className={styles.card}>
                    <button onClick={backToProducts} className={styles.cardArrow}>
                    </button>
                    <div className={styles.cardItem}>
                        <Card
                            view="horizontal" id={item.id}
                            title={item.title!} price={item.price!}
                            images={item.images} description={item.description!}
                            category={item.category!}
                        />
                    </div>
                </div>
            )}
            <RelatedItems categoryId={item.category!.id} />
        </>
    )
}

export default observer(Product)
