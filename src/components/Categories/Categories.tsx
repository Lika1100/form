import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import Text from 'components/Text';
import useNavigatePages from 'configs/useNavigatePages';
import CategoryStore from 'store/CategoryStore';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import img from '../../assets/imgSoon.jpg';
import styles from './Categories.module.scss';

function Categories() {
  const categoriesStore = useLocalStore(() => new CategoryStore());

  const { goToCategories } = useNavigatePages();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    categoriesStore.getList();
  }, [categoriesStore]);

  const { meta, list } = categoriesStore;

  const onClick = (id: number) => {
    searchParams.set('categoryId', String(id));
    setSearchParams(searchParams);
    goToCategories(String(id));
  };

  return (
    <div className={styles.categories}>
      {meta === Meta.success &&
        list.map(({ image, id, name }) => {
          return (
            <div className={styles.categoriesCard} key={id} onClick={() => onClick(id)}>
              <img
                src={image}
                alt="card"
                onError={({ currentTarget }) => {
                  currentTarget.src = img;
                }}
                className={styles.categoriesImg} />
              <Text view="p-20" maxLines={2} weight="bold" color="primary">
                {name}
              </Text>
            </div>
          );
        })}
    </div>
  );
}

export default observer(Categories);
