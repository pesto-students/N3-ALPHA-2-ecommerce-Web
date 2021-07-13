import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/CartContext';
import { useTranslation } from 'react-i18next';

const CartItem = ({ product }) => {
    const { increase, decrease, removeProduct } = useContext(CartContext);
    const { id = '', name = '', img = '', quantity, price = 0 } = product;
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="cartItem">
                <Link to={`/products/${id}`} className="cartItem_link">
                    <img src={`${img}`} className="cartItem_img" alt={name} />
                </Link>
                <div className="cartItem_detail">
                    <p className="cartItem_text">{name}</p>
                    <p className="cartItem_text">
                        <button
                            className="cartItem_btn"
                            onClick={() => increase(product)}
                            title="Increase Quantity"
                        >
                            +
                        </button>
                        <span className="cartItem_qty">{quantity}</span>
                        {quantity > 1 && (
                            <button
                                className="cartItem_btn"
                                onClick={() => decrease(product)}
                                title="Decrease Quantity"
                            >
                                -
                            </button>
                        )}
                        {quantity === 1 && (
                            <button
                                className="cartItem_btn"
                                onClick={() => removeProduct(product)}
                                title="Remove Product"
                            >
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        )}
                    </p>
                </div>
                <p className="cartItem_price">&#8377; {quantity * price}.00</p>
                <button
                    className="cartItem_btn"
                    onClick={() => removeProduct(product)}
                    title="Remove Product"
                >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </Fragment>
    );
};

export default CartItem;
