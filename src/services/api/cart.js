import firebase from './firebase';

async function update() {
    const ref = firebase.database().ref(`users`);
    return await ref.set({
        cart: [{ name: 'test' }],
    });
}

export default {
    update,
};
