import React, { Fragment, useContext } from 'react';
import Modal from '../Modal/modal';
import Login from './LoginForm';
import Register from './RegisterForm';
import Menu from './Menu';
import { Link, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { CartContext } from '../Contexts/CartContext';
import CartDetail from './CartDetail';
import { getLocalStorage } from '../../../helper/Utils';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

const Header = (props) => {
    const { cartItems = [] } = useContext(CartContext);
    const totalItem = cartItems.length;
    const userDetails = getLocalStorage('userDetails');
    const { t } = useTranslation();
    const {
        loginModal,
        signUp,
        formData,
        loader,
        handleLoginClick,
        handleCloseModal,
        handleSignupClick,
        onInputChange,
        handleSocialLogin,
        handleLRegister,
        handleLogin,
        logOut,
        handleMobileMenu,
        isMobileMenu,
        fixedHeader,
        isCartOpen,
        handleCartClick,
    } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchQuery = formData.get('search');
        const queryParams = qs.parse(props.location.search);
        const newQueryParam = {
            ...queryParams,
            search: searchQuery,
        };
        props.history.push(`/products?${qs.stringify(newQueryParam)}`);
    };

    return (
        <header className={`header ${fixedHeader}`}>
            <div className="header_topbar">
                <Menu
                    mobileMenu={true}
                    handleMobileMenu={handleMobileMenu}
                    isMobileMenu={isMobileMenu}
                />
                <Link to="/" className="header_logo">
                    <img
                        src="/assets/logo.png"
                        alt="LOGO HERE"
                        className="header_logo-img"
                    />
                </Link>
                <Menu />
                <form onSubmit={handleSubmit} className="header_search_form">
                    <input
                        name="search"
                        className="header_search"
                        type="text"
                        placeholder={t('search_placeholder')}
                    />
                </form>
                <div
                    className="header_cart"
                    onClick={(e) => handleCartClick(e)}
                >
                    <img
                        src="/assets/cart.png"
                        className="header_cart-icon"
                        alt="Cart Icon"
                    />
                    <span className="header_cart-text">
                        {t('cart')}({totalItem ? totalItem : 0})
                    </span>
                </div>
                <CartDetail
                    isCartOpen={isCartOpen}
                    handleCartClick={handleCartClick}
                />
                <div className="header_login">
                    <img
                        src="/assets/user.png"
                        alt="User Profile"
                        className="header_login-icon"
                    />
                    {userDetails ? (
                        <Fragment>
                            <span className="header_login-text">
                                {' '}
                                {t('profile_text')}
                            </span>
                            <div className="userMenu">
                                <Link to="/account" className="userMenu_item">
                                    {t('account_text')}
                                </Link>
                                <p
                                    className="userMenu_item"
                                    onClick={() => logOut()}
                                >
                                    {t('logOut_text')}
                                </p>
                            </div>
                        </Fragment>
                    ) : (
                        <span
                            className="header_login-text"
                            onClick={() => handleLoginClick()}
                        >
                            {t('login')}
                        </span>
                    )}
                </div>
                {loginModal && (
                    <Modal
                        openModal={loginModal}
                        onCloseModal={handleCloseModal}
                        overlayClass="loginOverlay"
                        modalClass="loginOverlay_modal"
                    >
                        {signUp ? (
                            <Register
                                handleSignupClick={handleSignupClick}
                                onchangeHandler={onInputChange}
                                handleRegister={handleLRegister}
                                formData={formData}
                                loader={loader}
                            />
                        ) : (
                            <Login
                                handleSignupClick={handleSignupClick}
                                onchangeHandler={onInputChange}
                                loginData={formData}
                                handleLogin={handleLogin}
                                handleSocialLogin={handleSocialLogin}
                                loader={loader}
                            />
                        )}
                    </Modal>
                )}
            </div>
            <form onSubmit={handleSubmit} className="mobileMenu_search">
                <input
                    name="search"
                    className="mobileMenu_search_input"
                    type="text"
                    placeholder={t('search_placeholder')}
                />
            </form>
            <LanguageSwitch />
        </header>
    );
};

export default withRouter(Header);
