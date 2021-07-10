import React, { useContext, Fragment, useEffect } from 'react';
import CartItem from './CartItem';
import './cart.scss';
import { CartContext } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { getUniqueObjectArrayByKey } from '../../../helper/Utils';
import firebase from 'firebase';
import { useTranslation } from 'react-i18next';

const CartDetail = ({ isCartOpen = false, handleCartClick }) => {
    const { cartItems, total = 0, syncCart } = useContext(CartContext);
    const wrapClass = isCartOpen ? 'show' : 'hide';

    useEffect(() => {
        /* Sync cart if the user is authenticated */
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                api.cart.get(user.uid).then((remoteCart) => {
                    const combinedCart = getUniqueObjectArrayByKey('id', [
                        ...cartItems,
                        ...(remoteCart || []),
                    ]);

                    syncCart(combinedCart);
                });
            }
        });
    }, []);
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className={`cartDetail ${wrapClass}`}>
                <div className="cartDetail_top">
                    <span className="cartDetail_head">
                        {t('your')} {t('cart')}
                    </span>
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
                                {t('total_text')}
                            </span>
                            <span className="cartDetail_head">
                                &#8377; {total}
                            </span>
                        </div>
                        <Link to="/checkout" className="cartDetail_checkoutBtn">
                            {t('checkout_text')}
                        </Link>
                    </Fragment>
                ) : (
                    <div className="cartDetail_noitem">
                        <h2 className="cartDetail_noitem_head">
                            {t('no_cart_text')}
                        </h2>
                        <Link
                            to="/products?category=all"
                            className="cartDetail_checkoutBtn"
                        >
                            {t('shop_text')}
                        </Link>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default CartDetail;
