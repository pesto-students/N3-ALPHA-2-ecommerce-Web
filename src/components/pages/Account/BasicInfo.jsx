import React from 'react';
import { getLocalStorage } from '../../../helper/Utils';
import Address from '../../shared/Address/Address';
import AddAddress from '../../shared/Address/AddAddress';

const BasicInfo = () => {
    const userDetails = getLocalStorage('userDetails');
    const { displayName = '', email = '' } = userDetails;

    return (
        <div className="basicInfo">
            <p className="basicInfo_info">
                <span className="basicInfo_info_label">Name</span>
                <span className="basicInfo_info_value">{displayName}</span>
            </p>
            <p className="basicInfo_info">
                <span className="basicInfo_info_label">Email</span>
                <span className="basicInfo_info_value">{email}</span>
            </p>
            <p className="basicInfo_info">
                <span className="basicInfo_info_label">Manage Address</span>
                <span className="basicInfo_info_value">
                    <Address value={'Hello Rohit Address 1'} />
                </span>
            </p>
            <p className="basicInfo_info">
                <span className="basicInfo_info_label"></span>
                <span className="basicInfo_info_value">
                    <AddAddress />
                </span>
            </p>
        </div>
    );
};

export default BasicInfo;
