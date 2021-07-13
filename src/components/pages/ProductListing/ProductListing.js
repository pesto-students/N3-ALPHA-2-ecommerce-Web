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

function Products(props) {
    const allProducts = useGetAllPRoducts();
    const [products, setProducts] = useState(allProducts);

    /* filter products based on category from url query params*/
    useEffect(() => {
        if (props.location.search) {
            const { category, search } = qs.parse(props.location.search);
            console.log('QUERY', category, search);
            if (category) {
                setProducts(filterProducts({ category, search }, allProducts));
            }
        }
    }, [props.location.search]);

    const handleFiltersChange = (filters) => {
        setProducts(filterProducts(filters, allProducts));
    };

    useEffect(() => {
        setProducts(allProducts);
    }, [allProducts]);

    useEffect(() => {
        document.title = 'HyGenie : Stay Home Stay Safe';
    });

    return (
        <Fragment>
            {products.length > 0 ? (
                <div className="products">
                    <div className="products_header">
                        <p align="right">{`${products.length} items`}</p>
                        <Divider />
                    </div>
                    <section className="products_section">
                        <Filters onFiltersChange={handleFiltersChange} />
                        <div className="products_list">
                            {products.map(({ id, name, thumbnail, price }) => (
                                <ProductItem
                                    key={id}
                                    id={id}
                                    name={name}
                                    img={`assets/${thumbnail}`}
                                    price={price}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            ) : (
                <FullPageLoader />
            )}
        </Fragment>
    );
}

export default withRouter(Products);
