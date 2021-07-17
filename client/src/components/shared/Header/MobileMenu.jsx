import React from 'react';
import { useTranslation } from 'react-i18next';

const MobileMenu = (props) => {
    const { handleMobileMenu, isMobileMenu = false, handleMenuSelect } = props;
    const handleClass = isMobileMenu ? 'show' : 'hide';
    const { t } = useTranslation();

    return (
        <nav className="mobileMenu" onClick={(e) => handleMenuSelect(e)}>
            <div className={`mobileMenu_content ${handleClass}`}>
                <p
                    className="mobileMenu_closeBtn"
                    onClick={() => handleMobileMenu()}
                >
                    ×
                </p>
                <p data-value="all" className="mobileMenu_item">
                    {t('product_all')}
                </p>
                <p data-value="mask" className="mobileMenu_item">
                    {t('product_mask')}
                </p>
                <p data-value="sanitizer" className="mobileMenu_item">
                    {t('product_sanitizer')}
                </p>
                <p data-value="handwash" className="mobileMenu_item">
                    {t('product_handWash')}
                </p>
                <p data-value="gloves" className="mobileMenu_item">
                    {t('product_gloves')}
                </p>
            </div>
            <span
                className="mobileMenu_menuBar"
                onClick={() => handleMobileMenu()}
            >
                ☰
            </span>
        </nav>
    );
};

export default MobileMenu;
