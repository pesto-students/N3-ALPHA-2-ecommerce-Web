import React, { Fragment } from 'react';
import Banner from './Banner';
import NewArrivals from './NewArrivals';
import { getSessionStorage } from '../../../helper/Utils';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';

const Home = () => {
    const newArrivals = getSessionStorage('arrivals') || [];
    const recomended = getSessionStorage('recomended') || [];
    return (
        <Fragment>
            {recomended.length > 0 ? (
                <Fragment>
                    <Banner />
                    <NewArrivals
                        heading="New Arrivals"
                        selectedProd={newArrivals}
                    />
                    <NewArrivals
                        heading="Recommended"
                        selectedProd={recomended}
                    />
                </Fragment>
            ) : (
                <FullPageLoader />
            )}
        </Fragment>
    );
};

export default Home;
