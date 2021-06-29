import React from 'react';

const Tab = ({ active, handleClick }) => {
    return (
        <ul
            className="account_content_tabs"
            id={0}
            onClick={(e) => handleClick(e)}
        >
            <li
                className={`account_content_tabs_item ${
                    active === 0 ? 'active' : ''
                }`}
                id={0}
            >
                Basic Info
            </li>
            <li
                className={`account_content_tabs_item ${
                    active === 1 ? 'active' : ''
                }`}
                id={1}
            >
                Order History
            </li>
        </ul>
    );
};

export default Tab;
