import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Divider from '../../shared/Divider/Divider';
import Filters from '../../shared/Filters/Filters';
import ProductItem from '../../shared/ProductItem/ProdcutItem';
import useGetAllPRoducts from '../../shared/Hooks/useGetAllProducts';
import { filterProducts } from './productListing.helpers';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import './productListing.scss';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';
import { capitalizeFirstLetter } from '../../../helper/Utils';
import { debounce } from 'lodash';

function Products(props) {
    const allProducts = useGetAllPRoducts();
    const [products, setProducts] = useState(allProducts);
    const [category, setCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const filterProductsHandler = (filters, products) => {
        console.log('FILTER');
        setProducts(filterProducts(filters, products));
    };

    const setFilteredProducts = useCallback(
        debounce(filterProductsHandler, 200),
        []
    );

    useEffect(() => {
        if (props.location.search) {
            const { category, search } = qs.parse(props.location.search);
            if (category) {
                setCategory(category);
            }
            if (search) {
                setSearch(search);
            }
            setFilteredProducts({ category, search }, allProducts);
        }
    }, [
        allProducts,
        props.location,
        props.location.search,
        setFilteredProducts,
    ]);

    useEffect(() => {
        setIsLoading(false);
    }, [products]);

    useEffect(() => {
        document.title = 'HyGenie | Stay Home Stay Safe';
    }, []);

    const handleFiltersChange = (filters) => {
        // setIsLoading(true);
        setFilteredProducts({ ...filters, category, search }, allProducts);
    };

    return (
        <Fragment>
            {isLoading && <FullPageLoader />}

            <div className="products">
                <div className="products_header">
                    <h3>{capitalizeFirstLetter(category)}</h3>
                    <p align="right">{`${products.length} items`}</p>
                </div>
                <Divider />
                <section className="products_section">
                    <Filters onFiltersChange={handleFiltersChange} />
                    {!products.length ? (
                        <div className="products_section_empty">
                            <div className="products_section_empty_content">
                                <h3>No products found</h3>
                                <img src="/products-empty.svg" />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="products_list">
                                {products.map(
                                    ({ id, name, thumbnail, price }) => (
                                        <ProductItem
                                            key={id}
                                            id={id}
                                            name={name}
                                            img={`assets/${thumbnail}`}
                                            price={price}
                                        />
                                    )
                                )}
                            </div>
                        </>
                    )}
                </section>
            </div>
        </Fragment>
    );
}

export default withRouter(Products);
