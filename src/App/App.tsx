import * as React from 'react';
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from 'components/Account/Login';
import UserPage from 'components/Account/UserPage';
import Cart from 'components/Cart';
import Categories from 'components/Categories';
import Container from 'components/Container';
import Layout from 'components/Layout';
import Payment from 'components/Payment';
import PrivateRoute from 'components/PrivateRoute';
import Product from 'components/Product';
import ProductsByCategories from 'components/ProductsByCategories';
import AboutPage from 'pages/AboutPage';
import ProductsPage from 'pages/ProductsPage';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParams';
import rootStore from 'store/RootStore/instance';
import { DBConfig } from "../DBConfig";


initDB(DBConfig)

const App = () => {
  useQueryParamsStoreInit();
  const { getAll } = useIndexedDB("cart")
  React.useEffect(() => {
    rootStore.user.authUser()
    getAll().then((res) => {
      rootStore.cart.upDateCart(res)
    })
  }, [getAll])
  
  return (
    <Container>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categoryId/:id" element={<ProductsByCategories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={
            <PrivateRoute isAuthorized={rootStore.user.isAuthorized}>
              <UserPage />
            </PrivateRoute>} />
          <Route path='/payment' element={<Payment />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App
