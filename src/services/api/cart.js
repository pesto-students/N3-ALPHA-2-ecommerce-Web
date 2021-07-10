import firebase from './firebase';

async function update(cartItems) {
    const { uid } = JSON.parse(localStorage.userDetails);
    const ref = firebase.database().ref(`users/${uid}`);
    return await ref.update({
        cart: cartItems,
    });
}

async function get(id) {
    const userDetails = localStorage.userDetails
        ? JSON.parse(localStorage.userDetails)
        : null;
    const uid = userDetails ? userDetails.uid : null;
    const ref = firebase.database().ref(`users/${id || uid}/cart`);
    const snapshot = await ref.once('value');
    return await snapshot.val();
}

export default {
    update,
    get,
};
