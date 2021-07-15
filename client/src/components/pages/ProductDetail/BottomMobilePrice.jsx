import React from 'react';
import { useTranslation } from 'react-i18next';

const MobileBottomPrice = ({ price = 0, isInCart = false, handleClick }) => {
    const { t } = useTranslation();
    return (
        <div className="bottomPrice">
            <h2 className="bottomPrice_price">
                {`₹${price}`}
                <span>
                    <del>{`₹${parseInt((110 / 100) * price)}`}</del>
                </span>{' '}
            </h2>
            <button
                class="bottomPrice_btn"
                onClick={(e) =>
                    handleClick(isInCart ? 'checkout' : 'addToCart')
                }
            >
                {isInCart ? t('checkout_text') : t('addCart_text')}
            </button>
        </div>
    );
};

export default MobileBottomPrice;
