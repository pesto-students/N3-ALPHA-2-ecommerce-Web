import React from 'react';
import { getLocalStorage } from '../../../helper/Utils';
import Addresses from '../../shared/Addresses/Addresses';

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
                    <Addresses />
                </span>
            </p>
        </div>
    );
};

export default BasicInfo;
