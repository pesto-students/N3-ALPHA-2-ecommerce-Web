import React, { Fragment } from 'react';
import Banner from './Banner';
import NewArrivals from './NewArrivals';
import { getSessionStorage } from '../../../helper/Utils';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const newArrivals = getSessionStorage('arrivals') || [];
    const recomended = getSessionStorage('recomended') || [];
    const { t } = useTranslation();
    return (
        <Fragment>
            {recomended.length > 0 ? (
                <Fragment>
                    <Banner />
                    <NewArrivals
                        heading={t('newArrivals_text')}
                        selectedProd={newArrivals}
                    />
                    <NewArrivals
                        heading={t('recomended_text')}
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
