import {
    checkValidEmail,
    checkValidEmailPass,
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
    setSessionStorage,
    getSessionStorage,
    deleteSessionStorage,
    sliceArray,
} from '../../helper/Utils';

/**
 * @param email
 * @description email should pe properly fomrated as per Email standards
 */
test('Invalid Email', () => {
    const validEmail = checkValidEmail('username@company');
    expect(validEmail).toBeFalsy();
});

test('Valid Email', () => {
    const validEmail = checkValidEmail('usrname@company.com');
    expect(validEmail).toBeTruthy();
});

test('Valid Email and Password', () => {
    const checkValidEmalPass = checkValidEmailPass(
        'usrname@company.com',
        'abcdef'
    );
    expect(checkValidEmalPass).toBeTruthy();
});

/**
 * @param (key, value)
 * @description set the value in local storages based on key
 * get the value from locastorage and match
 */
test('Get and Set Local Storage', () => {
    const setLocal = setLocalStorage('key', 'keyValue');
    expect(getLocalStorage('key')).toBe('keyValue');
});

/**
 * @param (key, value)
 * @description set the value in local storages based on key
 * delete the value from locastorage
 */
test('Delete Local Storage', () => {
    const setLocal = setLocalStorage('key', 'keyValue');
    expect(deleteLocalStorage('key')).toBeUndefined();
});

/**
 * @param (key, value)
 * @description set the value in session storages based on key
 * get the value from session storage
 */
test('Set and Get Session Storage', () => {
    const setSession = setSessionStorage('key', 'keyValue');
    expect(getSessionStorage('key')).toBe('keyValue');
});

/**
 * @param (key, value)
 * @description set the value in session storages based on key
 * delete the value from session storage
 */
test('Delete Session Storage', () => {
    const setSession = setSessionStorage('key', 'keyValue');
    expect(deleteSessionStorage('key')).toBeUndefined();
});

/**
 * @param (array, startvalue, endvalue)
 * @description slice the array based on start and end value passed
 */
test('Slice Array of length 3', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const slicedArray = sliceArray(arr, 0, 3);
    expect(slicedArray.length).toBe(3);
});

test('Slice Array all', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const slicedArray = sliceArray(arr, 0, 8);
    expect(slicedArray.length).toBe(8);
});
