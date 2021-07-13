import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SkeltonLoader from '../../shared/Loaders/SkeltonLoader';

const Banner = () => {
    const [showImgLoader, setImgLoader] = useState(true);
    const { t } = useTranslation();
    if (showImgLoader) {
        const objImg = new Image();
        objImg.src = '/assets/banner.jpg';
        objImg.onload = () => {
            setImgLoader(false);
        };
    }
    return (
        <section className="banner">
            {showImgLoader ? (
                <SkeltonLoader width={'100%'} height={'400px'} />
            ) : (
                <Fragment>
                    <img
                        src="/assets/banner.jpg"
                        className="banner_img"
                        alt="Banner"
                    />
                    <div className="banner_content">
                        <h1 className="banner_head">{t('header_heading')}</h1>
                        <p className="banner_text">{t('header_text')}</p>
                        <Link
                            to="/products?category=all"
                            className="banner_btn"
                        >
                            {t('shop_text')}
                        </Link>
                    </div>
                </Fragment>
            )}
        </section>
    );
};

export default Banner;
