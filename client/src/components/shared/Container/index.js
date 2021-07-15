import React from 'react';
import Notifications from 'react-notify-toast';
import Header from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';

const Container = (props) => (
    <div>
        <Header />
        <Notifications options={{ zIndex: 9999 }} className="errorToast" />
        <div className="main-content">{props.children}</div>
        <Footer />
    </div>
);
export default Container;
