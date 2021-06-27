import { notify } from 'react-notify-toast';

export const toaster = (msg, timePeriod, msgType) => {
    if (msgType) notify.show(msg, msgType, timePeriod ? timePeriod : 4000);
    else notify.show(msg, 'error', timePeriod ? timePeriod : 4000);
};

export const checkValidEmail = (email) => {
    var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Check email and password validation
export const checkValidEmailPass = (email, pass) => {
    if (!email) {
        toaster('Email can not be empty.');
        return {
            status: false,
        };
    }
    if (!checkValidEmail(email)) {
        toaster('Invalid Email format.');
        return {
            status: false,
        };
    }
    if (!pass) {
        toaster('Password can not be empty.');
        return {
            status: false,
        };
    } else {
        return {
            status: true,
        };
    }
};

export const setLocalStorage = (key, value = {}) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
};

export const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};

export const setSessionStorage = (key, value = {}) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key) => {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value);
};

export const deleteSessionStorage = (key) => {
    sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
    sessionStorage.clear();
};

export const isMobile = () => {
    return document.documentElement.clientWidth < 768;
};

export const getRandomArrayItem = (arr = [], number) => {
    let colArr = [];

    if (arr.length) {
        for (var i = 0; i < number; i++) {
            const rand = arr[Math.floor(Math.random() * arr.length)];
            colArr.push(rand);
        }
    }

    return colArr;
};

export const sliceArray = (arr = [], start, end) => {
    return arr.slice(start, end);
};
