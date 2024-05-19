import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'components/Container';
import Header from './Header';

function Layout(): JSX.Element {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default Layout;
