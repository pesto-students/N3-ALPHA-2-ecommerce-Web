import React, { Fragment } from 'react';
import i18next from 'i18next';

const LanguageSwitch = () => {
    return (
        <Fragment>
            <button onClick={() => i18next.changeLanguage('en')}>
                English
            </button>
            <button onClick={() => i18next.changeLanguage('hi')}>Hindi</button>
        </Fragment>
    );
};

export default LanguageSwitch;
