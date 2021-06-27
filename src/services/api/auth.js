import { auth } from '../api/firebaseMethods';
import { deleteLocalStorage } from '../../helper/Utils';

export const emailPassAuth = (email, password) => {
    return auth
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
            return cred.user;
        })
        .catch((error) => {
            return error;
        });
};

export const socialMediaAuth = (provider) => {
    return auth
        .signInWithPopup(provider)
        .then((res) => {
            return res.user;
        })
        .catch((error) => {
            return error;
        });
};

export const registerUser = (formData) => {
    const { name = '', email = '', password = '' } = formData;
    return auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
            const res = await setName(name, result.user);
            if (res) {
                return result.user;
            }
        })
        .catch((error) => {
            return error;
        });
};

export const setName = (name, user) => {
    return user
        .updateProfile({
            displayName: name,
        })
        .then(() => {
            return true;
        })
        .catch((error) => {
            return error;
        });
};

export const logOut = () => {
    auth.signOut();
    deleteLocalStorage('userDetails');
};

export default {};
