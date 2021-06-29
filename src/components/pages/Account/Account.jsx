import React, { useState } from 'react';
import Tab from './Tab';
import OrderHistory from './OrderHistory';
import BasicInfo from './BasicInfo';
import './account.scss';

const Account = () => {
    const [active, setActive] = useState(0);
    const handleClick = (e) => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
            setActive(index);
        }
    };

    return (
        <section className="account">
            <div className="account_content">
                <Tab active={active} handleClick={handleClick} />
                <div className="account_content_detail">
                    {active === 0 && <BasicInfo />}
                    {active === 1 && <OrderHistory />}
                </div>
            </div>
        </section>
    );
};

export default Account;
