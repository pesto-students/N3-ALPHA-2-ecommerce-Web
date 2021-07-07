import firebase from './firebase';

async function update(cartItems) {
    const { uid } = JSON.parse(localStorage.userDetails);
    const ref = firebase.database().ref(`users/${uid}`);
    return await ref.update({
        cart: cartItems,
    });
}

export default {
    update,
};
