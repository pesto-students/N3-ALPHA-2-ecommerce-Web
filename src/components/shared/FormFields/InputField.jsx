import React, { Fragment } from 'react';

const InputField = (props) => {
    const {
        type = '',
        placeholder = '',
        inputClass = '',
        name = '',
        value = '',
        onchangeHandler,
    } = props;

    return (
        <Fragment>
            <input
                type={type}
                placeholder={placeholder}
                className={`form_field ${inputClass}`}
                id={name}
                name={name}
                value={value}
                onChange={(e) => onchangeHandler(e)}
            />
        </Fragment>
    );
};

export default InputField;
