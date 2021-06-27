import firebase from './firebase';

async function getById(id) {
    const ref = firebase.database().ref(`products/${id}`);
    return await ref.once('value');
}

export default {
    getById,
};
