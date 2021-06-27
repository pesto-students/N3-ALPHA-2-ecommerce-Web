import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from '../../../reducers/CartReducer';
import { getLocalStorage } from '../../../helper/Utils';

export const CartContext = createContext();

const storage = getLocalStorage('cart') ? getLocalStorage('cart') : [];
const initialState = {
    cartItems: storage,
    ...sumItems(storage),
};

const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initialState);

    const addProduct = (payload) => {
        dispatch({ type: 'ADD_ITEM', payload });
    };

    const increase = (payload) => {
        dispatch({ type: 'INCREASE', payload });
    };

    const decrease = (payload) => {
        dispatch({ type: 'DECREASE', payload });
    };

    const removeProduct = (payload) => {
        dispatch({ type: 'REMOVE_ITEM', payload });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR' });
    };

    const contextValues = {
        addProduct,
        removeProduct,
        increase,
        decrease,
        clearCart,
        ...state,
    };

    return (
        <CartContext.Provider value={contextValues}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
