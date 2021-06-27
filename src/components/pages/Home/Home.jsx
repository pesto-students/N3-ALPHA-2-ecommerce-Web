import React, { Fragment } from 'react';
import Banner from './Banner';
import NewArrivals from './NewArrivals';

const Home = ({ newArrivals = [], recomended = [] }) => {
    return (
        <Fragment>
            <Banner />
            <NewArrivals heading="New Arrivals" selectedProd={newArrivals} />
            <NewArrivals heading="Recommended" selectedProd={recomended} />
        </Fragment>
    );
};

export default Home;
