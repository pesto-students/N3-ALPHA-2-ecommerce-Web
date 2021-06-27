import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="banner">
            <img src="/assets/banner.jpg" className="banner_img" alt="Banner" />
            <div className="banner_content">
                <h1 className="banner_head">Prevention is better than cure</h1>
                <p className="banner_text">
                    Order now and get things delivered within 48hrs.
                </p>
                <Link to="/products?category=all" className="banner_btn">
                    Shop Now
                </Link>
            </div>
        </section>
    );
};

export default Banner;
