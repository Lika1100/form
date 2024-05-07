import { observer } from 'mobx-react-lite'
import * as React from 'react'
import Text from 'components/Text'
import useNavigatePages from 'configs/useNavigatePages'
import CategoryStore from 'store/CategoryStore';
import { useLocalStore } from 'utils/useLocalStore'
import img from "../../assets/imgSoon.jpg"
import styles from "./Categories.module.scss";

function Categories() {
    const categoriesStore = useLocalStore(() => new CategoryStore())
    const {goToCategories} = useNavigatePages()
    React.useEffect(() => {
        categoriesStore.getList()
    }, [categoriesStore])

    const { meta, list } = categoriesStore
    
    return (
        <div className={styles.categories}>
            {meta === "success" && list
                .map(({ image, id, name }) => {
                    return (
                        <div key={id} className={styles.categories__card} onClick={() => goToCategories(String(id))}>
                            <img src={image} alt='card'
                              className={styles.categories__img} 
                              onError={({currentTarget}) => {currentTarget.src = img}}
                            />
                            <Text 
                              view='p-20' maxLines={2} 
                              weight='bold' color='primary'
                            >
                                {name}
                            </Text>
                        </div>
                    )
                })}
        </div>
    )
}

export default observer(Categories)
