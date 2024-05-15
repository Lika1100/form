import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Account from 'components/Account';
import Cart from 'components/Cart';
import Categories from 'components/Categories';
import Container from 'components/Container';
import Layout from 'components/Layout';
import Payment from 'components/Payment';
import Product from 'components/Product';
import ProductsByCategories from 'components/ProductsByCategories';
import AboutPage from 'pages/AboutPage';
import ProductsPage from 'pages/ProductsPage';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParams';
import UserPage from 'components/Account/UserPage';
import PrivateRoute from 'components/PrivateRoute';
import rootStore from 'store/RootStore/instance';
import { statusAuth } from 'store/RootStore/AuthStore/AuthStore';



const App = () => {
  useQueryParamsStoreInit()
  return (
    <Container>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<ProductsPage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categoryId/:id" element={<ProductsByCategories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Account />} />
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
