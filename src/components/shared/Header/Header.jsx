import React, { Fragment, useContext } from 'react';
import Modal from '../Modal/modal';
import Login from './LoginForm';
import Register from './RegisterForm';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import { Link, withRouter } from 'react-router-dom';
import qs from 'query-string';
import { CartContext } from '../Contexts/CartContext';
import CartDetail from './CartDetail';
import { getLocalStorage } from '../../../helper/Utils';

const Header = (props) => {
    const { cartItems = [] } = useContext(CartContext);
    const totalItem = cartItems.length;
    const userDetails = getLocalStorage('userDetails');
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
                <MobileMenu
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
                <form onSubmit={handleSubmit} className="header_search_form">
                    <input
                        name="search"
                        className="header_search"
                        type="text"
                        placeholder="Search for products"
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
                        Cart(
                        {totalItem ? totalItem : 0})
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
                                My Account
                            </span>
                            <div className="userMenu">
                                <Link to="/account" className="userMenu_item">
                                    Account
                                </Link>
                                <p
                                    className="userMenu_item"
                                    onClick={() => logOut()}
                                >
                                    Logout
                                </p>
                            </div>
                        </Fragment>
                    ) : (
                        <span
                            className="header_login-text"
                            onClick={() => handleLoginClick()}
                        >
                            Login / Signup
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
            <input
                type="text"
                placeholder="Search for products"
                className="mobileMenu_search"
            />
            <Menu />
        </header>
    );
};

export default withRouter(Header);
