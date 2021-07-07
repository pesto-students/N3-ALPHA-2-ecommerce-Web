import React, { useState, Fragment, useEffect } from 'react';
import Tab from './Tab';
import OrderHistory from './OrderHistory';
import BasicInfo from './BasicInfo';
import { getLocalStorage } from '../../../helper/Utils';
import './account.scss';
import qs from 'query-string';
import api from '../../../services/api';

const Account = () => {
    const [active, setActive] = useState(0);
    const userDetails = getLocalStorage('userDetails');
    const [orders, setOrders] = useState([]);

    const handleClick = (e) => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };

    useEffect(() => {
        const activeMenu = qs.parse(window.location.search).menu;
        if (activeMenu === 'orders') setActive(1);

        /* Fetch orders */
        api.order.getAll().then((res) => {
            if (res.val()) {
                const orders = Object.entries(res.val()).map(([key, value]) => {
                    console.log(key, value);
                    return { ...value, id: key };
                });
                console.log(orders);
                setOrders(orders);
            }
        });
    }, []);

    return (
        <Fragment>
            {userDetails ? (
                <section className="account">
                    <div className="account_content">
                        <Tab active={active} handleClick={handleClick} />
                        <div className="account_content_detail">
                            {active === 0 && <BasicInfo />}
                            {active === 1 && <OrderHistory orders={orders} />}
                        </div>
                    </div>
                </section>
            ) : (
                (window.location.href = '/')
            )}
        </Fragment>
    );
};

export default Account;
