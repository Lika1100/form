import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import About from 'components/About';
import Loader from 'components/Loader';
import Products from 'components/Products';
import styles from "components/Products/Products.module.scss"
import Search from 'components/Search';
import SelectedFilter from 'components/SelectedFilter';
import { API_ENDPOINTS } from 'configs/baseUrl';
import limit from 'configs/limit';
import CatalogStore from 'store/CatalogStore';
import rootStore from 'store/RootStore/instance';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import * as React from 'react';

function ProductsPage() {
    const productsStore = useLocalStore(() => new CatalogStore());
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
      const pageParams = rootStore.query.getParam("page")
      const page = pageParams === undefined ? "1" : pageParams
      const titleParams = rootStore.query.getParam("title") === undefined ? "" : rootStore.query.getParam("title")
      const id = rootStore.query.getParam("categoryId") === undefined ? "" : rootStore.query.getParam("categoryId")
     
      productsStore.getList(`${API_ENDPOINTS.PRODUCTS}`, `?limit=${limit*+page}&offset=&title=${titleParams}&categoryId=${id}`)

    }, [productsStore, searchParams, setSearchParams])

    const { meta, list } = productsStore

    function next() {
      let page = searchParams.get("page")
      if (page === null) {
        page = "2"
      } else {
        page = String(+page + 1)
      }

      searchParams.set("page", page)
      setSearchParams(searchParams)
      rootStore.query.setSearch(searchParams.toString())
    }

    if (meta === Meta.initial || meta === Meta.loading) {
      return <Loader size="l" className={styles.cards__loader} />
    }

  return (
    <>
      <About />
      <Search />
      <SelectedFilter />
      <InfiniteScroll
        dataLength={list.length}
        next={next}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Products list={list}/>
      </InfiniteScroll>
        
    </>
  )
}

export default observer(ProductsPage);
