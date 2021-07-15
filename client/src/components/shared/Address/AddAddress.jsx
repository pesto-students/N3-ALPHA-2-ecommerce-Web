import React, { Fragment, useState } from 'react';
import Address from './Address';
import './address.scss';

const ManageAddress = () => {
    const [address, setAddress] = useState('');
    const [showAdd, setAdd] = useState(false);
    const [isAdded, setAdded] = useState(false);

    const onchangeHandler = (e) => {
        const addressVal = e.target.value;
        setAddress(addressVal);
    };

    const handleSave = () => {
        setAdd(false);
        setAdded(true);
    };

    const handleAddAddress = () => {
        setAdd(true);
    };

    const handleCancel = () => {
        setAdd(false);
    };

    return (
        <Fragment>
            {isAdded && <Address value={address} />}
            {showAdd ? (
                <div className="addressWrap">
                    <textarea
                        name="address"
                        rows="2"
                        cols="50"
                        placeholder="Add Address"
                        className={`addressWrap_area editMode`}
                        onChange={(e) => onchangeHandler(e)}
                    >
                        {address}
                    </textarea>
                    <div className="addressWrap_btnWrap">
                        <button
                            className="addressWrap_btn"
                            onClick={() => handleSave()}
                        >
                            Save
                        </button>
                        <button
                            className="addressWrap_btn"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="basicInfo_btn"
                    onClick={() => handleAddAddress()}
                >
                    Add New Addess
                </button>
            )}
        </Fragment>
    );
};

export default ManageAddress;
