import React from 'react';
import ProductItem from '../../shared/ProductItem/ProdcutItem';

const NewArrivals = (props) => {
    const { heading = '', selectedProd = [] } = props;
    return (
        <section className="newArrivals">
            <h1 className="newArrivals_heading">{heading}</h1>
            <div className="newArrivals_content">
                {selectedProd.slice(0, 4).map((itemData, index) => {
                    const {
                        thumbnail = '',
                        name = '',
                        price = '',
                        id = '',
                    } = itemData;
                    return (
                        <ProductItem
                            name={name}
                            img={`/assets/${thumbnail}`}
                            price={price}
                            id={id}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default NewArrivals;
