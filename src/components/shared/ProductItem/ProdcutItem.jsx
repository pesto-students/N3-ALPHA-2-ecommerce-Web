import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './productItem.scss';
import { CartContext } from '../Contexts/CartContext';

export default function ProductItem(props) {
    const { name, img, price, id } = props;
    const { cartItems, addProduct, increase } = useContext(CartContext);
    const isInCart = (product) => {
        return !!cartItems.find((item) => item.id === product.id);
    };

    return (
        <div className="product-item">
            <Link to={`/products/${id}`} className="product-item-link">
                <img src={img} className="product-item-img" alt={name} />
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
                    Add More
                </button>
            ) : (
                <button
                    className="product-item-cart"
                    onClick={() => addProduct(props)}
                >
                    Add to cart
                </button>
            )}
        </div>
    );
}
