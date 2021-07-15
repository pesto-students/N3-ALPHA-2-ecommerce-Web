import React, { useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './productItem.scss';
import { CartContext } from '../Contexts/CartContext';
import { useTranslation } from 'react-i18next';
import SkeltonLoader from '../Loaders/SkeltonLoader';

export default function ProductItem(props) {
    const [showImgLoader, setImgLoader] = useState(true);
    const { name, img, price, id } = props;
    const { cartItems, addProduct, increase } = useContext(CartContext);
    const isInCart = (product) => {
        return !!cartItems.find((item) => item.id === product.id);
    };
    const { t } = useTranslation();

    if (showImgLoader) {
        const objImg = new Image();
        objImg.src = props.img;
        objImg.onload = () => {
            setImgLoader(false);
        };
    }

    return (
        <Fragment>
            <div className="product-item">
                <Link to={`/products/${id}`} className="product-item-link">
                    {showImgLoader ? (
                        <SkeltonLoader width={'100%'} height={'10rem'} />
                    ) : (
                        <img
                            src={img}
                            className="product-item-img"
                            alt={name}
                        />
                    )}
                    <div className="product-content">
                        <h1 className="product-item-heading">{name}</h1>
                        <p className="product-item-price">&#8377; {price}</p>
                    </div>
                </Link>
                {isInCart(props) ? (
                    <button
                        className="product-item-cart"
                        onClick={() => increase(props)}
                    >
                        {t('addMore_text')}
                    </button>
                ) : (
                    <button
                        className="product-item-cart"
                        onClick={() => addProduct(props)}
                    >
                        {t('addCart_text')}
                    </button>
                )}
            </div>
        </Fragment>
    );
}
