import React, { Fragment, useState, useEffect } from 'react';
import { auth } from '../../../services/api/firebaseMethods';
import {
    emailPassAuth,
    socialMediaAuth,
    registerUser,
    logOut,
} from '../../../services/api/auth';
import {
    toaster,
    checkValidEmailPass,
    setLocalStorage,
} from '../../../helper/Utils';
import HeaderComponent from './Header';
import './header.scss';

const HeaderContainer = (props) => {
    const [loginModal, setLoginModal] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [loader, setLoader] = useState(false);
    const [isMobileMenu, setMobileMenu] = useState(false);
    const [fixedHeader, setFixedHeader] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleLoginClick = () => {
        setLoginModal(true);
    };

    const handleCloseModal = () => {
        setLoginModal(false);
    };

    const handleSignupClick = () => {
        setFormData({});
        setSignUp(!signUp);
    };

    const onInputChange = (e) => {
        const { name = '', value = '' } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLoginResponse = (res) => {
        if (res.message) {
            toaster(res.message);
            setLoader(false);
        }
        if (res.uid) {
            toaster('Logged In', 3000, 'success');
            setLocalStorage('userDetails', res);
            setLoginModal(false);
            setFormData({});
            setLoader(false);
            setSignUp(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        const res = await socialMediaAuth(provider);
        handleLoginResponse(res);
    };

    const handleLRegister = async (e) => {
        e.preventDefault();
        setLoader(true);
        const { email = '', password = '' } = formData;
        const { status = false } = checkValidEmailPass(email, password);
        if (status) {
            const res = await registerUser(formData);
            handleLoginResponse(res);
        } else {
            setLoader(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoader(true);
        const { email = '', password = '' } = formData;
        const { status = false } = checkValidEmailPass(email, password);
        if (status) {
            const res = await emailPassAuth(email, password);
            handleLoginResponse(res);
        } else {
            setLoader(false);
        }
    };

    const handleMobileMenu = () => {
        setMobileMenu(!isMobileMenu);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        if (window.location.href) {
            setMobileMenu(false);
            setIsCartOpen(false);
        }
    }, [window.location.href]);

    const handleScroll = () => {
        const scrollValue = window.scrollY;
        if (scrollValue > 80) {
            setLoginModal(false);
            setIsCartOpen(false);
            setFixedHeader('fixed');
        }
        if (scrollValue < 80) {
            setFixedHeader('');
        }
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setIsCartOpen(!isCartOpen);
    };

    auth.onAuthStateChanged((user) => {
        if (user) {
            setIsLogedIn(true);
        } else setIsLogedIn(false);
    });

    return (
        <Fragment>
            <HeaderComponent
                {...{
                    loginModal,
                    signUp,
                    formData,
                    isLogedIn,
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
                }}
            />
        </Fragment>
    );
};

export default HeaderContainer;
