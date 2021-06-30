import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import MobileMenu from './MobileMenu';

const Menu = (props) => {
    const { mobileMenu = false, handleMobileMenu, isMobileMenu } = props;
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        const { category } = qs.parse(props.location.search);
        if (category) {
            setCurrentCategory(category);
        }
    }, [props.location.search]);

    const handleMenuSelect = (e) => {
        const category = e.target.getAttribute('data-value');
        if (category) {
            const queryParams = qs.parse(props.location.search);
            const newQueryParam = {
                ...queryParams,
                category,
            };
            props.history.push(`/products?${qs.stringify(newQueryParam)}`);
        }
    };

    return (
        <Fragment>
            {mobileMenu ? (
                <MobileMenu
                    handleMenuSelect={handleMenuSelect}
                    handleMobileMenu={handleMobileMenu}
                    isMobileMenu={isMobileMenu}
                />
            ) : (
                <nav className="menu" onClick={(e) => handleMenuSelect(e)}>
                    <p
                        data-value="all"
                        className={`menu_item ${
                            currentCategory === 'all' && 'menu_item_selected'
                        }`}
                    >
                        All Products
                    </p>
                    <p
                        data-value="mask"
                        className={`menu_item ${
                            currentCategory === 'mask' && 'menu_item_selected'
                        }`}
                    >
                        Masks
                    </p>
                    <p
                        data-value="sanitizer"
                        className={`menu_item ${
                            currentCategory === 'sanitizer' &&
                            'menu_item_selected'
                        }`}
                    >
                        Sanitizers
                    </p>
                    <p
                        data-value="handwash"
                        className={`menu_item ${
                            currentCategory === 'handwash' &&
                            'menu_item_selected'
                        }`}
                    >
                        Hand Wash
                    </p>
                    <p
                        data-value="gloves"
                        className={`menu_item ${
                            currentCategory === 'gloves' && 'menu_item_selected'
                        }`}
                    >
                        Gloves
                    </p>

                    <span className="menuBar">☰</span>
                </nav>
            )}
        </Fragment>
    );
};

export default withRouter(Menu);
