import React, { Fragment, useEffect } from 'react';
import Home from './Home';
import './home.scss';
import useGetAllProducts from '../../shared/Hooks/useGetAllProducts';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';

const HomeContainer = () => {
    const allProducts = useGetAllProducts();
    useEffect(() => {}, [allProducts]);

    return (
        <Fragment>
            {allProducts.length > 0 ? <Home /> : <FullPageLoader />}
        </Fragment>
    );
};

export default HomeContainer;
