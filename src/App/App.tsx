import { Navigate, Route, Routes } from 'react-router-dom';
import Cart from 'components/Cart';
import Categories from 'components/Categories';
import Container from 'components/Container';
import Layout from 'components/Layout';
import Product from 'components/Product';
import ProductsByCategories from 'components/ProductsByCategories';
import ProductsPage from 'pages/ProductsPage';
import * as React from 'react';



const App = () => {
  return (
    <Container>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ProductsPage />} path='/page/:page'></Route>
          <Route path='/' element={<Navigate to="page/1"/>}></Route>
          <Route path="/product/:productId" element={<Product />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/categoryId/:id" element={<ProductsByCategories />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
      </Routes>
    </Container>
  );
};

export default App
