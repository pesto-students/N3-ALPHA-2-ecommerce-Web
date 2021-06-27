import { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../../../helper/Utils';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = getLocalStorage(key);
        if (jsonValue != null) return jsonValue;
        else return initialValue;
    });

    useEffect(() => {
        setLocalStorage(key, value);
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
