import firebase from './firebase';

async function getAll(id) {
    const { uid } = JSON.parse(localStorage.userDetails);

    console.log('UID', uid);
    const ref = firebase.database().ref(`users/${uid}/orders`);
    return await ref.once('value');
}

export default {
    getAll,
};
