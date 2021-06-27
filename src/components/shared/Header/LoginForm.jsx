import React, { Fragment } from 'react';
import InputField from '../FormFields/InputField';
import Button from '../FormFields/Button';
import { googleAuth } from '../../../services/api/firebaseMethods';
import '../FormFields/form.scss';

const LoginForm = (props) => {
    const {
        onchangeHandler,
        handleSignupClick,
        loginData = {},
        handleLogin,
        handleSocialLogin,
        loader = false,
    } = props;

    return (
        <form className="loginRegForm">
            <h2 className="loginRegForm_head">
                Already Have an Account ? Login Here
            </h2>
            <InputField
                type={'email'}
                placeholder={'Enter Email'}
                id={'email'}
                name={'email'}
                value={loginData['email']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'password'}
                placeholder={'Enter Password'}
                id={'password'}
                name={'password'}
                value={loginData['password']}
                onchangeHandler={onchangeHandler}
            />
            <Button
                buttonLabel={'Login'}
                onclickHandler={(e) => handleLogin(e, 'login')}
                loader={loader}
            />
            {loader ? (
                ''
            ) : (
                <Fragment>
                    <p
                        className="header_signUp-social"
                        onClick={() => handleSocialLogin(googleAuth)}
                    >
                        <img
                            src="/assets/google.png"
                            className="socialIcon"
                            alt="social login"
                        />{' '}
                        <span>Continue With Google</span>
                    </p>
                    <p>
                        Don't have an account?{' '}
                        <span
                            className="header_signUp"
                            onClick={() => handleSignupClick()}
                        >
                            Create an Account
                        </span>
                    </p>
                </Fragment>
            )}
        </form>
    );
};

export default LoginForm;
