import { observer } from "mobx-react-lite";
import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Card from "components/Card";
import Loader from 'components/Loader';
import { API_ENDPOINTS} from "configs/baseUrl";
import useNavigatePages from "configs/useNavigatePages";
import CatalogStore from "store/CatalogStore";
import { useLocalStore } from 'utils/useLocalStore';
import styles from "./ProductsByCategories.module.scss";
import * as React from "react";

function ProductsByCategories() {
    const {id = "1"} = useParams()
    const {backToProducts} = useNavigatePages()

    const productsCategories = useLocalStore(() => new CatalogStore())
    
    useEffect(() => {
        productsCategories.getList(API_ENDPOINTS.PRODUCTS_BY_CATEGORY, id)
    }, [id, productsCategories])
    
    const {list, meta} = productsCategories

    if (meta === "initial" || meta === "loading") {
        return <Loader size="l" className={styles.categories__loader} />
    }
    
    return (
            <div className={styles.categories}>
                <svg onClick={backToProducts} className={styles.categories__arrow}>
                        <use xlinkHref="/sprite.svg#arrow" />
                </svg>
                {meta === "success" && list
                    .map(({ price, images, description, id, title, category}) => {
                        return (
                            <div key={id}>
                                <Card price={price!} images={images} id={id}
                                    description={description!} title={title!}
                                    category={category!}
                                    key={id} className={styles.categories__item}
                                />
                            </div>
                        )
                    })}
            </div>
    )
}

export default observer(ProductsByCategories)
