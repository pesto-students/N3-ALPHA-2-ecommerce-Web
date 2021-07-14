import { useEffect, useState } from 'react';
import api from '../../../services/api';
import './addresses.scss';
import { toaster } from '../../../helper/Utils';
import { useTranslation } from 'react-i18next';
import user from '../../../services/api/user';

function AddressItem(props) {
    const {
        id,
        onUpdate,
        text: defaultText,
        isDefault,
        onChange,
        onCancel,
        addresses,
        editMode,
        draftMode,
        onSelect,
        target,
    } = props;
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        console.log(props);
    });

    useEffect(() => setIsEditing(editMode), [editMode]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (draftMode) {
            // delete the last addedd address from the draft
            onChange(addresses.filter((address) => address.id !== id));
        }
        onCancel();
    };

    const handleSave = () => {
        const address = addresses.find((address) => address.id === id);
        const { text } = address;
        if (!text) return;
        if (!addresses.length) address.default = true; // set as default address if its the only address
        setIsEditing(false);
        onUpdate(addresses);
        if (onSelect) {
            onSelect(addresses.find((item) => item.selected));
        }
    };

    const handleChange = (e) => {
        onChange(
            addresses.map((address) => {
                if (address.id === id) address.text = e.target.value;
                return address;
            })
        );
    };

    const handleDelete = () => {
        const _addresses = addresses.filter((address) => address.id !== id);
        if (_addresses.length === 1) _addresses[0].default = true; // set as default address if its the only address
        onChange(_addresses);
        onUpdate(_addresses);
    };

    const handleDefaultChange = (e) => {
        console.log('DEFAULT');
        const _addresses = addresses.map((address) => {
            if (address.id === id) {
                target === 'checkout' // if addresses component is used in checkout page, use the selected address for order
                    ? (address.selected = true)
                    : (address.default = true);
            } else {
                target === 'checkout' // if addresses component is used in checkout page, use the selected address for order
                    ? (address.selected = false)
                    : (address.default = false);
            }
            return address;
        });

        onChange(_addresses);
        onUpdate(_addresses);
        if (onSelect) {
            onSelect(addresses.find((item) => item.selected));
        }
    };

    return (
        <div className="addresses_address_item">
            {!isEditing && (
                <input
                    checked={isDefault}
                    onChange={handleDefaultChange}
                    className="addresses_address_item_radio"
                    type="radio"
                    name="default"
                />
            )}
            <div className="addresses_address_item_content">
                {isEditing || draftMode ? (
                    <textarea
                        value={defaultText}
                        className="addresses_address_item_textarea"
                        onChange={handleChange}
                    />
                ) : (
                    <span className="addresses_address_item_text">
                        {defaultText}
                    </span>
                )}
            </div>

            {!isEditing && (
                <>
                    <button
                        className="addresses_address_item_btn"
                        onClick={handleEdit}
                    >
                        <i className="fa fa-pen" aria-hidden="true"></i>{' '}
                    </button>
                    <button
                        className="addresses_address_item_btn danger"
                        onClick={handleDelete}
                    >
                        <i className="fa fa-trash" aria-hidden="true"></i>{' '}
                    </button>
                </>
            )}
            {isEditing && (
                <>
                    <button
                        className="addresses_address_item_btn"
                        onClick={handleCancel}
                    >
                        <i className="fa fa-times" aria-hidden="true"></i>{' '}
                    </button>
                    <button
                        className="addresses_address_item_btn"
                        onClick={handleSave}
                    >
                        <i className="fa fa-check" aria-hidden="true"></i>{' '}
                    </button>
                </>
            )}
        </div>
    );
}

function Addresses(props) {
    const { onSelect, target, onUpdate } = props;
    const [isNewClicked, setIsNewClicked] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [defaultAddresses, setDefaultAddresses] = useState([]);
    const { t } = useTranslation();
    const [isEmpty, setIsEmpty] = useState(false);

    const isAuthenticated = localStorage.userDetails;

    useEffect(() => {
        getAllAddresses();
    }, []);

    useEffect(() => onUpdate(addresses), [addresses, onUpdate]);

    const getAllAddresses = async () => {
        try {
            const snapshot = await api.address.getAll();
            let userData = await snapshot.val();
            let addresses = userData ? userData.addresses : [];
            addresses = addresses.map((address, id) => {
                address.id = id;
                return address;
            });
            if (!addresses.length) setIsEmpty(true); // Prompt user to add address if there are none
            setAddresses(addresses);
            setDefaultAddresses(JSON.parse(JSON.stringify(addresses))); // keep a copy to undo changes when cancel is clicked
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (addresses) => {
        setAddresses(addresses);
    };

    const handleAddNew = () => {
        if (!isAuthenticated) {
            toaster('Please login to continue', 3000, 'error');
            return;
        }

        const id = addresses.length.toString();
        setIsNewClicked(true);
        setCurrentId(id);
        setIsEmpty(false);
        const isOnlyAddress = !addresses.length;
        const newAddress = {
            id,
            text: '',
            default: isOnlyAddress,
            selected: isOnlyAddress,
        }; // set address as default if its the only address
        onChange([...addresses, newAddress]);
    };

    const handleUpdate = (addresses) => {
        setIsNewClicked(false);
        api.address.update(addresses).then((res) => {
            getAllAddresses();

            toaster(
                target === 'checkout'
                    ? 'Delivery address has been updated'
                    : 'Addresses have been updated!',
                3000,
                'success'
            );
        });
    };

    const handleCancel = () => {
        setAddresses(JSON.parse(JSON.stringify(defaultAddresses)));
    };

    return (
        <div className="addresses">
            {isEmpty ? (
                <h3>You haven't added any addresses yet</h3>
            ) : (
                addresses.map((address) => (
                    <AddressItem
                        key={address.id}
                        id={address.id}
                        text={address.text}
                        isDefault={
                            target === 'checkout'
                                ? address.selected
                                : address.default
                        }
                        onChange={onChange}
                        onUpdate={handleUpdate}
                        onCancel={handleCancel}
                        addresses={addresses}
                        editMode={Boolean(
                            currentId && currentId === address.id
                        )}
                        draftMode={
                            Boolean(
                                currentId &&
                                    currentId === address.id &&
                                    isNewClicked
                            ) // true when add new  is clicked
                        }
                        onSelect={onSelect}
                        target={target}
                    />
                ))
            )}

            <button className="addresses_btn-add" onClick={handleAddNew}>
                {t('addnewAdd_text')}
            </button>
        </div>
    );
}

export default Addresses;
