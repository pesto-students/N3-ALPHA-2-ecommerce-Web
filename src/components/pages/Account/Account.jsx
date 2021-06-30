import React, { useState, Fragment } from 'react';
import Tab from './Tab';
import OrderHistory from './OrderHistory';
import BasicInfo from './BasicInfo';
import { getLocalStorage } from '../../../helper/Utils';
import './account.scss';

const Account = () => {
    const [active, setActive] = useState(0);
    const userDetails = getLocalStorage('userDetails');

    const handleClick = (e) => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };

    return (
        <Fragment>
            {userDetails ? (
                <section className="account">
                    <div className="account_content">
                        <Tab active={active} handleClick={handleClick} />
                        <div className="account_content_detail">
                            {active === 0 && <BasicInfo />}
                            {active === 1 && <OrderHistory />}
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
