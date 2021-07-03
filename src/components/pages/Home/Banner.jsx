import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Banner = () => {
    const { t } = useTranslation();
    return (
        <section className="banner">
            <img src="/assets/banner.jpg" className="banner_img" alt="Banner" />
            <div className="banner_content">
                <h1 className="banner_head">{t('header_heading')}</h1>
                <p className="banner_text">{t('header_text')}</p>
                <Link to="/products?category=all" className="banner_btn">
                    {t('shop_text')}
                </Link>
            </div>
        </section>
    );
};

export default Banner;
