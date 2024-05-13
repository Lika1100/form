import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import * as React from "react"
import Card from "components/Card"
import Text from "components/Text"
import { API_ENDPOINTS } from "configs/baseUrl"
import CatalogStore from "store/CatalogStore"
import { Meta } from "utils/meta"
import { useLocalStore } from "utils/useLocalStore"
import styles from "./RelatedItems.module.scss"

type RelatedType = {
    categoryId: number | undefined
}

function RelatedItems({ categoryId }: RelatedType) {
    const relatedStore = useLocalStore(() => new CatalogStore())
    useEffect(() => {
        relatedStore.getList(API_ENDPOINTS.PRODUCTS_BY_CATEGORY, `${categoryId}&limit=3&offset=2`)
    }, [categoryId, relatedStore])

    const { list, meta } = relatedStore

    return (
        <div className={styles.related}>
            <Text view="title">
                RelatedItems
            </Text>
            <div className={styles.relatedCards}>
                {meta === Meta.success && (
                    list.map(({ id, images, title, price, description, category }) => {
                        return (
                            <div key={id} className={styles.relatedCard}>
                                <Card
                                    id={id}
                                    images={images}
                                    title={title!}
                                    price={price!}
                                    description={description!}
                                    category={category!}
                                />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default observer(RelatedItems)
