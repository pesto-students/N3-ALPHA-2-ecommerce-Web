import React, { useContext, useState, useEffect, Fragment } from 'react';
import CartItem from '../../shared/Header/CartItem';
import '../../shared/Header/cart.scss';
import { CartContext } from '../../shared/Contexts/CartContext';
import Addresses from '../../shared/Addresses/Addresses';
import './checkout.scss';
import firebase from 'firebase';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';
import { baseURL } from '../../../services/api/config';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toaster } from '../../../helper/Utils';
import address from '../../../services/api/address';

function Checkout(props) {
    const { cartItems, total = 0, clearCart } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const { t } = useTranslation();
    const isAuthenticated = localStorage.userDetails;

    useEffect(() => {
        document.title = 'Checkout | HyGenie';

        if (!isAuthenticated) {
            toaster('Please login to continue', 3000, 'error');
        }
    }, [isAuthenticated]);

    const handlePayment = () => {
        if (!isAuthenticated) {
            toaster('Please login to continue', 3000, 'error');
            return;
        }
        if (!deliveryAddress) {
            toaster('No delivery address has been set', 3000, 'error');
            return;
        }
        if (!cartItems.length) {
            toaster('Your cart is empty', 3000, 'error');
            return;
        }
        setIsLoading(true);

        const makePayment = firebase
            .functions()
            .httpsCallable('createStripeCheckout');

        const line_items = cartItems.map((cartItem) => ({
            quantity: cartItem.quantity,
            price_data: {
                currency: 'inr',
                unit_amount: 100 * cartItem.price,
                product_data: {
                    name: cartItem.name,
                },
            },
        }));

        const stripe = window.Stripe(
            'pk_test_51J8OHVSExG0AVvgthbeLCEur6ss94JI6seNGDByeHNg9WOHvI1LP8cYOFqCkZxq2Wc7DMgToyduS3nRKSXESBw6j00NH3ajClG'
        );

        makePayment({
            line_items,
            success_url: `${baseURL}/account?menu=orders&checkout=true`,
            cancel_url: `${baseURL}/checkout`,
            address: deliveryAddress,
        })
            .then((res) => {
                setIsLoading(false);
                const sessionId = res.data.id;
                stripe.redirectToCheckout({ sessionId });
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleAddressSelect = (address) => {
        console.log('ADDRESS');
        setDeliveryAddress(address.text);
    };

    const handleAddressUpdate = (addresses) => {
        // if selected address doesnt exist in the updated addresses set delivery address to empty
        // This handles cases where an address is set as delivery address and then deleted
        if (addresses.length === 1) {
            setDeliveryAddress(addresses[0].text);
            return;
        } else if (addresses.length > 1) {
            const selectedAddress = addresses.find(
                (address) => address.selected
            );

            if (selectedAddress) setDeliveryAddress(selectedAddress.text);
            return;
        }

        const addressExists = addresses.some(
            (address) => address.text === deliveryAddress
        );

        if (!addressExists) setDeliveryAddress('');
    };

    return (
        <>
            {isLoading && <FullPageLoader />}
            <div className="checkout-page">
                <div className="checkout-page_content">
                    <h4 className="checkout-page_title">
                        {t('checkout_text')}
                    </h4>

                    <section className="checkout-page_wrapper">
                        {/* Shipping Address */}
                        <div className="checkout-page_wrapper_address">
                            <h5 className="checkout-page_subheading">
                                {t('shipping_text')} {t('address_text')}
                            </h5>
                            <div className="checkout-page_wrapper_addresses">
                                <Addresses
                                    target="checkout"
                                    onSelect={handleAddressSelect}
                                    onUpdate={handleAddressUpdate}
                                />
                            </div>
                        </div>
                        {/* Cart items */}
                        <div className="checkout-page_wrapper_cart">
                            <h5 className="checkout-page_subheading">
                                {t('cart')}
                            </h5>
                            <div className="cartDetail">
                                <div className="cartDetail_content">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((product) => (
                                            <CartItem
                                                key={product.id}
                                                product={product}
                                            />
                                        ))
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
                                {cartItems.length > 0 && (
                                    <div className="cartDetail_top amount">
                                        <span className="cartDetail_head">
                                            {t('total_text')}
                                        </span>
                                        <span className="cartDetail_head">
                                            &#8377; {total}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                className="checkout-page_payment-btn"
                                onClick={handlePayment}
                            >
                                {t('proceedPay_text')}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default withRouter(Checkout);
