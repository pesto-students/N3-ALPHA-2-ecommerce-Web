import { getLocalStorage } from '../../helper/Utils';
import { emailPassAuth, registerUser, logOut } from '../../services/api/auth';

/**
 * @param (email, password)
 * @description return error if unregistered users try to login
 */
test('Unregistered User', async () => {
    const validEmail = await emailPassAuth('user@hygenie.com', 'abcdef');
    expect(validEmail.code).toBe('auth/user-not-found');
});

/**
 * @param (email, password)
 * @description return error if password of the given email is incorrect
 */
test('Wrong Password', async () => {
    const validEmail = await emailPassAuth('rohit@tgs.com', 'abcdef');
    expect(validEmail.code).toBe('auth/wrong-password');
});

/**
 * @param (email, password)
 * @description return userdetails if email and password is correct
 */
test('Success Login', async () => {
    const validEmail = await emailPassAuth('rohit@tgs.com', 'rohit@123');
    expect(validEmail).not.toBeNull();
});

/**
 * @param (name, email, password)
 * @description return error if password is not geater than or equals to 6 chracters
 */
test('Register with less than 6 digit password', async () => {
    const regdata = {
        name: 'test',
        email: 'rohit@test.com',
        password: 'abc',
    };
    const regUser = await registerUser(regdata);
    expect(regUser.code).toBe('auth/weak-password');
});

/**
 * @param (name, email, password)
 * @description return error if user register with existing email
 */
test('Register with existing email', async () => {
    const regdata = {
        name: 'test',
        email: 'rohit@tgs.com',
        password: 'abcdef',
    };
    const regUser = await registerUser(regdata);
    expect(regUser.code).toBe('auth/email-already-in-use');
});

/**
 * @param (name, email, password)
 * @description return user details with success registration
 */
test('Successful Register', async () => {
    const regdata = {
        name: 'Test User',
        email: 'user@test.com',
        password: 'abcdef',
    };
    const regUser = await registerUser(regdata);
    expect(regUser).not.toBeNull();
});

/**
 * @description logs out and remove the user details from localstorage
 */
test('Logout', async () => {
    const validEmail = await emailPassAuth('rohit@tgs.com', 'rohit@123');
    logOut();
    expect(getLocalStorage('userDetails')).toBeNull();
});
