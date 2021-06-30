import React from 'react';

const MobileBottomPrice = ({ price = 0 }) => {
    return (
        <div className="bottomPrice">
            <h2 className="bottomPrice_price">
                {`₹${price}`}
                <span>
                    <del>{`₹${parseInt((110 / 100) * price)}`}</del>
                </span>{' '}
            </h2>
            <button class="bottomPrice_btn">Checkout</button>
        </div>
    );
};

export default MobileBottomPrice;
