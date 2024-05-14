import cn from "classnames";
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import About from 'components/About';
import ArrowUp from "components/Icons/ArrowUp";
import Loader from 'components/Loader';
import Products from 'components/Products';
import styles from "components/Products/Products.module.scss"
import Search from 'components/Search';
import SelectedFilter from 'components/SelectedFilter';
import CatalogStore from 'store/CatalogStore';
import rootStore from "store/RootStore/instance";
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import s from "./ProductPage.module.scss";

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

    productsStore.getList()
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

  return (
    <>
      <ArrowUp
        onClick={onClick}
        className={cn(s.scrollToTopBtn, s[scrollButton])}
      />
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
    </>
  )
}

export default observer(ProductsPage);
