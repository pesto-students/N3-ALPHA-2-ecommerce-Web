import React, { Fragment } from 'react';
import InputField from '../FormFields/InputField';
import Button from '../FormFields/Button';
import '../FormFields/form.scss';
import { useTranslation } from 'react-i18next';

const RegisterForm = (props) => {
    const {
        onchangeHandler,
        handleSignupClick,
        handleRegister,
        formData = {},
        loader = false,
    } = props;
    const { t } = useTranslation();

    return (
        <form>
            <h2>{t('register_text')}</h2>
            <InputField
                type={'text'}
                placeholder={`${t('enter_text')} ${t('name_text')}`}
                id={'name'}
                name={'name'}
                value={formData['name']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'email'}
                placeholder={`${t('enter_text')} ${t('email_text')}`}
                id={'email'}
                name={'email'}
                value={formData['email']}
                onchangeHandler={onchangeHandler}
            />
            <InputField
                type={'password'}
                placeholder={`${t('enter_text')} ${t('password_text')}`}
                id={'password'}
                name={'password'}
                value={formData['password']}
                onchangeHandler={onchangeHandler}
            />
            <Button
                buttonLabel={t('register_text')}
                onclickHandler={(e) => handleRegister(e, 'register')}
                loader={loader}
            />
            {loader ? (
                ''
            ) : (
                <Fragment>
                    <p>
                        {t('already_text')}
                        <span
                            className="header_signUp"
                            onClick={() => handleSignupClick()}
                        >
                            {t('login')}
                        </span>
                    </p>
                </Fragment>
            )}
        </form>
    );
};

export default RegisterForm;
