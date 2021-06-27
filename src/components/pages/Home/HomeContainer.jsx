import React, { Fragment } from 'react';
import HomeComponent from './Home';
import './home.scss';
import useGetAllProducts from '../../shared/Hooks/useGetAllProducts';
import { getRandomArrayItem, sliceArray } from '../../../helper/Utils';
import useSessionStorage from '../../shared/Hooks/useSessionStorage';

const HomeContainer = () => {
    const allProducts = useGetAllProducts(),
        selectedProd = getRandomArrayItem(allProducts, 8),
        newArrivals = sliceArray(selectedProd, 0, 4),
        recomended = sliceArray(selectedProd, 4, 8);
    const [arrivals] = useSessionStorage('arrivals', newArrivals);
    const [allRecomended] = useSessionStorage('recomended', recomended);
    return (
        <Fragment>
            <HomeComponent newArrivals={arrivals} recomended={allRecomended} />
        </Fragment>
    );
};

export default HomeContainer;
