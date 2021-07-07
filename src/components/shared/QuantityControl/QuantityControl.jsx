import { useState, useEffect } from 'react';
import './quantityControl.scss';

export default function QuantityControl(props) {
    const [quantity, setQuantity] = useState(props.quantity || 0);

    useEffect(() => props.onChange(quantity), [quantity]);

    const updateQuantity = (operation) => {
        if (operation === 'add') {
            setQuantity(quantity + 1);
        } else {
            if (quantity < 1) {
                return;
            } else {
                setQuantity(quantity - 1);
            }
        }
    };

    return (
        <div className="quantity-control">
            <button onClick={(e) => updateQuantity('remove')}>-</button>
            <h4>{quantity}</h4>
            <button onClick={(e) => updateQuantity('add')}>+</button>
        </div>
    );
}
