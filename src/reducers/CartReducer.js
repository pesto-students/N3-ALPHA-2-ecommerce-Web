import { update } from 'lodash';
import { setLocalStorage } from '../helper/Utils';
import { toaster } from '../helper/Utils';
import api from '../services/api';

const Storage = (cartItems) => {
    setLocalStorage('cart', cartItems.length > 0 ? cartItems : []);
};

export const sumItems = (cartItems) => {
    Storage(cartItems);
    let itemCount = cartItems.reduce(
        (total, product) => total + product.quantity,
        0
    );
    let total = cartItems
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2);
    return { itemCount, total };
};

const updateRemoteCart = (cart) => {
    const isAuthenticated = localStorage.userDetails;
    console.log('upated cart');
    if (Boolean(isAuthenticated)) {
        console.log('AUTH');
        api.cart
            .update(cart)
            .then((res) => toaster('updated cart', 3000, 'erro'));
    }
    return;
};

export const CartReducer = (state, action) => {
    let updatedState = {};
    switch (action.type) {
        case 'ADD_ITEM':
            if (
                !state.cartItems.find((item) => item.id === action.payload.id)
            ) {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                });
                toaster('Item Added in cart', 3000, 'success');
            }

            updatedState = {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };

            updateRemoteCart(updatedState.cartItems);
            return updatedState;

        case 'REMOVE_ITEM':
            toaster('Item removed from cart', 3000, 'success');

            updatedState = {
                ...state,
                ...sumItems(
                    state.cartItems.filter(
                        (item) => item.id !== action.payload.id
                    )
                ),
                cartItems: [
                    ...state.cartItems.filter(
                        (item) => item.id !== action.payload.id
                    ),
                ],
            };

            updateRemoteCart(updatedState.cartItems);
            return updatedState;

        case 'INCREASE':
            state.cartItems[
                state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                )
            ].quantity++;

            updatedState = {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };

            updateRemoteCart(updatedState.cartItems);
            return updatedState;

        case 'DECREASE':
            state.cartItems[
                state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                )
            ].quantity--;

            updatedState = {
                ...state,
                ...sumItems(state.cartItems),
                cartItems: [...state.cartItems],
            };

            updateRemoteCart(updatedState.cartItems);
            return updatedState;

        case 'CLEAR':
            updatedState = {
                cartItems: [],
                ...sumItems([]),
            };

            updateRemoteCart(updatedState.cartItems);
            return updatedState;

        default:
            return state;
    }
};
