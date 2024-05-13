import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import * as React from 'react';
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
import s from "./ProductPage.module.scss";
import cn from "classnames";

function ProductsPage() {
  const productsStore = useLocalStore(() => new CatalogStore());
  const [searchParams, setSearchParams] = useSearchParams();
  const [scrollButton, setScrollButton] = React.useState("hidden")

  const next = React.useCallback(() => {
    let page = searchParams.get("page")

    if (page === null) {
      page = "2"
    } else {
      page = String(+page + 1)
    }

    searchParams.set("page", page)
    setSearchParams(searchParams)

  }, [searchParams, setSearchParams])

  useEffect(() => {
    rootStore.query.setSearch(searchParams.toString())
    rootStore.query.setSearch(searchParams.toString())
    const pageParams = rootStore.query.getParam("page")
    const page = pageParams === undefined ? "1" : pageParams
    const titleParams = rootStore.query.getParam("title") === undefined ? "" : rootStore.query.getParam("title")
    const id = rootStore.query.getParam("categoryId") === undefined ? "" : rootStore.query.getParam("categoryId")

    productsStore.getList(API_ENDPOINTS.PRODUCTS, `?offset=${limit * +page - limit}&limit=${limit}&title=${titleParams}&categoryId=${id}`)

  }, [productsStore, setSearchParams, searchParams])

  const { meta, list, all } = productsStore

  function onScroll() {
    const position = window.scrollY;

    if (position > 20) {
      setScrollButton("show")
    } else {
      setScrollButton("hidden")
    }
  }

  function onClick() {
    window.scrollTo(0, 0)
  }
  console.log(scrollButton, "scroll")
  return (
    <div>
      <button className={cn(s.scrollToTopBtn, s[scrollButton])} onClick={onClick}>
        <svg width="24px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 
                  8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 
                  15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 
                  11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F" />
        </svg>
      </button>
      <About />
      <Search />
      <SelectedFilter />
      <InfiniteScroll
        onScroll={onScroll}
        dataLength={all.length}
        next={next}
        hasMore={list.length === 9}
        loader={(meta === Meta.loading || meta === Meta.initial) && <Loader size="l" className={styles.cardsLoader} />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Products list={all} />
      </InfiniteScroll>

    </div>
  )
}

export default observer(ProductsPage);
