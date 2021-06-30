import { useEffect } from 'react';
import { database } from '../../../services/api/firebaseMethods';
import useLocalStorage from './useLocalStorage';
import {
    getRandomArrayItem,
    sliceArray,
    setSessionStorage,
    getSessionStorage,
} from '../../../helper/Utils';

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
            const selectedProd = getRandomArrayItem(allData, 8),
                newArrivals = sliceArray(selectedProd, 0, 4),
                recomended = sliceArray(selectedProd, 4, 8);
            const sessionArrival = getSessionStorage('arrivals') || [];
            const sessionRecomend = getSessionStorage('recomended') || [];
            if (sessionArrival.length > 0 && sessionRecomend.length > 0) {
                return;
            } else {
                setSessionStorage('arrivals', newArrivals);
                setSessionStorage('recomended', recomended);
            }
            setValue(allData);
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return value;
};

export default useGetAllPRoducts;
