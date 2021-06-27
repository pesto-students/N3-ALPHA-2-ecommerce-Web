import { useState, useEffect } from 'react';
import { getSessionStorage, setSessionStorage } from '../../../helper/Utils';

const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = getSessionStorage(key);
        if (jsonValue != null) return jsonValue;
        else return initialValue;
    });

    useEffect(() => {
        setSessionStorage(key, value);
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;
