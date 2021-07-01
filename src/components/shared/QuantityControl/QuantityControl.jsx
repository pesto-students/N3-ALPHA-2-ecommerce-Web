import { useState, useEffect } from 'react';
import './quantityControl.scss';

export default function QuantityControl(props) {
    const [quanity, setQuantity] = useState(props.quanity || 1);

    useEffect(() => props.onChange(quanity), [quanity]);

    const updateQuantity = (operation) => {
        if (operation === 'add') {
            setQuantity(quanity + 1);
        } else {
            if (quanity < 2) {
                return;
            } else {
                setQuantity(quanity - 1);
            }
        }
    };

    return (
        <div className="quanity-control">
            <button onClick={(e) => updateQuantity('remove')}>-</button>
            <h4>{quanity}</h4>
            <button onClick={(e) => updateQuantity('add')}>+</button>
        </div>
    );
}
