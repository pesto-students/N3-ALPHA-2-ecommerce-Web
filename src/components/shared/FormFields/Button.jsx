import React, { Fragment } from 'react';

const Button = (props) => {
    const {
        buttonClass = '',
        buttonLabel = 'Submit',
        onclickHandler,
        loader = false,
        loaderClass = '',
    } = props;

    return (
        <Fragment>
            {loader ? (
                <img
                    src="assets/loader.svg"
                    className={`form_loader ${loaderClass}`}
                    alt="Loader"
                />
            ) : (
                <button
                    type="button"
                    className={`form_btn ${buttonClass}`}
                    onClick={(e) => onclickHandler(e)}
                >
                    {buttonLabel}
                </button>
            )}
        </Fragment>
    );
};

export default Button;
