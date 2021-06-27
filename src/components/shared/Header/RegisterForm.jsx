import React, { Fragment } from 'react';
import InputField from '../FormFields/InputField';
import Button from '../FormFields/Button';
import '../FormFields/form.scss';

const RegisterForm = (props) => {
    const {
        onchangeHandler,
        handleSignupClick,
        handleRegister,
        formData = {},
        loader = false,
    } = props;
    return (
        <form>
            <h2>Register</h2>
            <InputField
                type={'text'}
                placeholder={'Enter Name'}
                id={'name'}
                name={'name'}
                value={formData['name']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'email'}
                placeholder={'Enter Email'}
                id={'email'}
                name={'email'}
                value={formData['email']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'password'}
                placeholder={'Enter Password'}
                id={'password'}
                name={'password'}
                value={formData['password']}
                onchangeHandler={onchangeHandler}
            />
            <Button
                buttonLabel={'Register'}
                onclickHandler={(e) => handleRegister(e, 'register')}
                loader={loader}
            />
            {loader ? (
                ''
            ) : (
                <Fragment>
                    <p>
                        Already have an account?{' '}
                        <span
                            className="header_signUp"
                            onClick={() => handleSignupClick()}
                        >
                            Sign in
                        </span>
                    </p>
                </Fragment>
            )}
        </form>
    );
};

export default RegisterForm;
