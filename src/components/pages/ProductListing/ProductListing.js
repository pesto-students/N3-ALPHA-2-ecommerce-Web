import React, { Fragment, useState, useEffect } from 'react';
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

function Products(props) {
    const allProducts = useGetAllPRoducts();
    const [products, setProducts] = useState(allProducts);
    const [category, setCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    /* filter products based on category from url query params*/
    useEffect(() => {
        if (props.location.search) {
            const { category, search } = qs.parse(props.location.search);
            console.log('QUERY', category, search);
            if (category) {
                setCategory(category);
                setProducts(filterProducts({ category, search }, allProducts));
            }
        }
    }, [props.location.search]);

    useEffect(() => {
        setIsLoading(false);
    }, [products]);

    const handleFiltersChange = (filters) => {
        setIsLoading(true);
        setProducts(filterProducts(filters, allProducts));
    };

    useEffect(() => {
        document.title = 'HyGenie : Stay Home Stay Safe';
    }, []);

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
