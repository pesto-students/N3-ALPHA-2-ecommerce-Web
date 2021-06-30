import React, { Fragment } from 'react';
import Banner from './Banner';
import NewArrivals from './NewArrivals';
import { getSessionStorage } from '../../../helper/Utils';

const Home = () => {
    const newArrivals = getSessionStorage('arrivals') || [];
    const recomended = getSessionStorage('recomended') || [];
    return (
        <Fragment>
            <Banner />
            <NewArrivals heading="New Arrivals" selectedProd={newArrivals} />
            <NewArrivals heading="Recommended" selectedProd={recomended} />
        </Fragment>
    );
};

export default Home;
