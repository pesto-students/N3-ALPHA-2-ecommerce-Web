import firebase from './firebase';

async function updateAddress(addresses) {
    const ref = firebase.database().ref(`users`);
    return await ref.set({
        addresses,
    });
}

export default {
    updateAddress,
};
