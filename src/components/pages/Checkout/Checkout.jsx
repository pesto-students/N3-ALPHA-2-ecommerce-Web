import React, { useContext, useState } from 'react';
import CartItem from '../../shared/Header/CartItem';
import '../../shared/Header/cart.scss';
import { CartContext } from '../../shared/Contexts/CartContext';
import { Link } from 'react-router-dom';
import Addresses from '../../shared/Addresses/Addresses';
import './checkout.scss';

function Checkout(props) {
    const { cartItems, total = 0 } = useContext(CartContext);

    const _addresses = [
        { text: 'f fdlkj fdlskjf fldskjk fsdlkjk jfsdlkj ', default: true },
        { text: 'f fdlkj fdlskjf fldskjk fsdlkjk jfsdlkj ', default: false },
        { text: 'f fdlkj fdlskjf fldskjk fsdlkjk jfsdlkj ', default: false },
    ];
    const [addresses, setAddresses] = useState(_addresses);

    const handleAddressUpdate = (addresses) => {
        setAddresses(
            addresses.map((address, id) => {
                address.id = id;
                return address;
            })
        );
    };

    return (
        <div className="checkout-page">
            <div className="checkout-page_content">
                <h4 class="checkout-page_title">Checkout</h4>

                <section className="checkout-page_wrapper">
                    {/* Shipping Address */}
                    <div className="checkout-page_wrapper_address">
                        <h5 className="checkout-page_subheading">
                            Shipping address
                        </h5>
                        <div className="checkout-page_wrapper_addresses">
                            <Addresses
                                addresses={addresses}
                                onUpdate={handleAddressUpdate}
                            />
                        </div>
                    </div>
                    {/* Cart items */}
                    <div className="checkout-page_wrapper_cart">
                        <div className="cartDetail">
                            <h4>Items</h4>
                            <div className="cartDetail_content">
                                {cartItems.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                            <div className="cartDetail_top amount">
                                <span className="cartDetail_head">
                                    Delivery charges
                                </span>
                                <span className="cartDetail_head">
                                    &#8377; 50
                                </span>
                                <br />
                                <span className="cartDetail_head">
                                    Total Amount
                                </span>
                                <span className="cartDetail_head">
                                    &#8377; {total}
                                </span>
                            </div>
                            {/* <Link to="/" className="cartDetail_checkoutBtn">
                            Checkout
                        </Link> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Checkout;
