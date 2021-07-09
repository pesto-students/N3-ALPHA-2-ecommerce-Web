import React, { Fragment } from 'react';
import InputField from '../FormFields/InputField';
import Button from '../FormFields/Button';
import { googleAuth } from '../../../services/api/firebaseMethods';
import '../FormFields/form.scss';
import { useTranslation } from 'react-i18next';

const LoginForm = (props) => {
    const {
        onchangeHandler,
        handleSignupClick,
        loginData = {},
        handleLogin,
        handleSocialLogin,
        loader = false,
    } = props;
    const { t } = useTranslation();

    return (
        <form className="loginRegForm">
            <h2 className="loginRegForm_head">{t('login_head')}</h2>
            <InputField
                type={'email'}
                placeholder={`${t('enter_text')} ${t('email_text')}`}
                id={'email'}
                name={'email'}
                value={loginData['email']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'password'}
                placeholder={`${t('enter_text')} ${t('password_text')}`}
                id={'password'}
                name={'password'}
                value={loginData['password']}
                onchangeHandler={onchangeHandler}
            />
            <Button
                buttonLabel={t('login')}
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
                        <span>{t('google_text')}</span>
                    </p>
                    <p>
                        {t('donot_account_text')}
                        <span
                            className="header_signUp"
                            onClick={() => handleSignupClick()}
                        >
                            {t('create_text')}
                        </span>
                    </p>
                </Fragment>
            )}
        </form>
    );
};

export default LoginForm;
