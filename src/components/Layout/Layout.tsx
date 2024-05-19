import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
