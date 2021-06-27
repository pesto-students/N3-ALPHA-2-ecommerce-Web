import { useEffect } from 'react';
import { database } from '../../../services/api/firebaseMethods';
import useLocalStorage from './useLocalStorage';

const useGetAllPRoducts = () => {
    const [value, setValue] = useLocalStorage('products', []);
    const getProducts = async () => {
        await database.once('value').then((snapshot) => {
            const allData = Object.entries(snapshot.val().products).map(
                ([key, value]) => {
                    return {
                        ...value,
                        id: key,
                    };
                }
            );
            console.log('ALL', allData);
            setValue(allData);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return value;
};

export default useGetAllPRoducts;
