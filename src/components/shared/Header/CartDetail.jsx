import React, { useContext, Fragment } from 'react';
import CartItem from './CartItem';
import './cart.scss';
import { CartContext } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';

const CartDetail = ({ isCartOpen = false, handleCartClick }) => {
    const { cartItems, total = 0 } = useContext(CartContext);
    const wrapClass = isCartOpen ? 'show' : 'hide';
    return (
        <Fragment>
            <div className={`cartDetail ${wrapClass}`}>
                <div className="cartDetail_top">
                    <span className="cartDetail_head">Your cart</span>
                    <p
                        className="cartDetail_closeBtn"
                        onClick={(e) => handleCartClick(e)}
                    >
                        ×{' '}
                    </p>
                </div>
                {cartItems.length > 0 ? (
                    <Fragment>
                        <div className="cartDetail_content">
                            {cartItems.map((product) => (
                                <CartItem key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="cartDetail_top amount">
                            <span className="cartDetail_head">
                                Total Amount
                            </span>
                            <span className="cartDetail_head">
                                &#8377; {total}
                            </span>
                        </div>
                        <Link to="/checkout" className="cartDetail_checkoutBtn">
                            Checkout
                        </Link>
                    </Fragment>
                ) : (
                    <div className="cartDetail_noitem">
                        <h2 className="cartDetail_noitem_head">
                            No items in the cart
                        </h2>
                        <Link
                            to="/products?category=all"
                            className="cartDetail_checkoutBtn"
                        >
                            Shop Now
                        </Link>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default CartDetail;
