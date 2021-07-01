import { useState, useEffect } from 'react';

function AddressItem(props) {
    const {
        id,
        onInputChange,
        onEdit,
        onCancel,
        onSave,
        text: defaultText,
        isDefault,
        onUpdate,
        addresses,
    } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(defaultText);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave(id, text);
    };

    const handleUpdate = (e) => {
        console.log(e.target.value, addresses, id);
        onUpdate(
            addresses.map((address) => {
                if (address.id === id) address.text = e.target.value;
                return address;
            })
        );
    };

    return (
        <div className="addresses_address_item">
            {!isEditing && (
                <input
                    checked={isDefault}
                    className="addresses_address_item_radio"
                    type="radio"
                />
            )}
            {isEditing ? (
                <textarea
                    value={defaultText}
                    className="addresses_address_item_textarea"
                    onChange={handleUpdate}
                />
            ) : (
                <span className="addresses_address_item_text">
                    {defaultText}
                </span>
            )}
            {!isEditing && (
                <button
                    className="addresses_address_item_btn-edit"
                    onClick={handleEdit}
                >
                    Edit
                </button>
            )}
            {isEditing && (
                <>
                    <button
                        className="addresses_address_item_btn-cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="addresses_address_item_btn-save"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </>
            )}
        </div>
    );
}

function Addresses(props) {
    const { addresses, onUpdate } = props;
    const [isNewClicked, setIsNewClicked] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleAddNew = () => {
        setIsNewClicked(true);
        const newAddress = { id: addresses.length, text: '', default: false };
        onUpdate([...addresses, newAddress]);
    };

    const handleCancel = (id) => {
        setIsNewClicked(false);
    };

    const handleSave = (id, text) => {
        setIsNewClicked(false);
        onUpdate(
            addresses.map((address) => {
                if (addresses.id === id) address.text = text;
                return address;
            })
        );
    };

    return (
        <div className="addresses">
            {addresses.map((address) => (
                <AddressItem
                    id={address.id}
                    text={address.text}
                    isDefault={address.default}
                    onSave={() => {}}
                    onUpdate={onUpdate}
                    addresses={addresses}
                />
            ))}
            {/* Add new address */}
            {isNewClicked && (
                <div className="addresses_add">
                    <textarea
                        className="addresses_address_item_textarea"
                        value={
                            currentId
                                ? addresses.find(
                                      (item) => item.id === currentId
                                  ).text
                                : ''
                        }
                    />
                    <button
                        className="addresses_address_item_btn-save"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="addresses_address_item_btn-cancel"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            )}

            <button className="addresses_btn-add" onClick={handleAddNew}>
                Add new address
            </button>
        </div>
    );
}

export default Addresses;
