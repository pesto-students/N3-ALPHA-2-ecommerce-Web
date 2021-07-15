import React, { useState } from 'react';
import './address.scss';

const ManageAddress = ({ value = '' }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [address, setAddress] = useState(value);

    const handleEdit = () => {
        setIsEdit(true);
    };
    const handleCancel = () => {
        setIsEdit(false);
    };

    const onchangeHandler = (e) => {
        const addressVal = e.target.value;
        setAddress(addressVal);
    };

    const handleSave = () => {
        console.log('address ==>', address);
        setIsEdit(false);
    };

    const editClass = isEdit ? 'editMode' : '';

    return (
        <div className="addressWrap">
            <textarea
                name="address"
                rows="2"
                cols="50"
                placeholder="Add Address"
                className={`addressWrap_area ${editClass}`}
                onChange={(e) => onchangeHandler(e)}
            >
                {value}
            </textarea>
            {isEdit ? (
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
            ) : (
                <button
                    className="addressWrap_btn"
                    onClick={() => handleEdit()}
                >
                    Edit
                </button>
            )}
        </div>
    );
};

export default ManageAddress;
