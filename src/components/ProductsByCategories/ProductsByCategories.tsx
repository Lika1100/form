import { observer } from "mobx-react-lite";
import { useEffect } from 'react'
import * as React from "react";
import { useParams } from "react-router-dom";
import Card from "components/Card";
import Loader from 'components/Loader';
import { API_ENDPOINTS } from "configs/baseUrl";
import useNavigatePages from "configs/useNavigatePages";
import CatalogStore from "store/CatalogStore";
import { useLocalStore } from 'utils/useLocalStore';
import styles from "./ProductsByCategories.module.scss";

function ProductsByCategories() {
    const { id = "1" } = useParams()
    const { backToProducts } = useNavigatePages()

    const productsCategories = useLocalStore(() => new CatalogStore())

    useEffect(() => {
        productsCategories.getList(API_ENDPOINTS.PRODUCTS_BY_CATEGORY, id)
    }, [id, productsCategories])

    const { list, meta } = productsCategories

    if (meta === "initial" || meta === "loading") {
        return <Loader size="l" className={styles.categoriesLoader} />
    }

    return (
        <div className={styles.categories}>
            <button onClick={backToProducts} className={styles.categoriesArrow} />
            {meta === "success" && list
                .map(({ price, images, description, id, title, category }) => {
                    return (
                        <div key={id}>
                            <Card price={price!} images={images} id={id}
                                description={description!} title={title!}
                                category={category!}
                                key={id}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export default observer(ProductsByCategories)
