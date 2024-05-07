import { Outlet } from "react-router-dom";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParams";
import Header from "./Header";
import * as React from "react";



function Layout():JSX.Element {
    useQueryParamsStoreInit()
    return (
            <>
                <Header />
                <Outlet />
            </>
    );
}

export default Layout