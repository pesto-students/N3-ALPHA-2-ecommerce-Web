import firebase from './firebase';

async function update(addresses) {
    const { uid } = JSON.parse(localStorage.userDetails);

    const ref = firebase.database().ref(`users/${uid}`);
    return await ref.update({
        addresses,
    });
}

async function getAll() {
    const { uid } = JSON.parse(localStorage.userDetails);
    const ref = firebase.database().ref(`users/${uid}`);
    return await ref.once('value');
}

export default {
    update,
    getAll,
};
