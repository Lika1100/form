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
import ProductsPage from 'pages/ProductsPage';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParams';
import UserPage from 'components/Account/UserPage';



const App = () => {
  useQueryParamsStoreInit()
  return (
    <Container>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ProductsPage />} path='/page/:page' />
          <Route path='/' element={<Navigate to="page/1" />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/categoryId/:id" element={<ProductsByCategories />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<Account />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App
