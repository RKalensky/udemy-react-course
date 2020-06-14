import React from 'react';
import './index.styl';
import generateId from '../../../utils/generateId';

function isInvalid({ typing, valid, touched, validationMethod }) {
    return !typing && !valid && validationMethod && touched;
}

const Input = (props) => {
    const id = props.id || generateId();
    const cls = [
        'brand-input',
        props.customClass || ''
    ]

    if (isInvalid(props)) {
        cls.push('invalid');
    }

    return (
        <div className={ cls.join(' ') }>
            <label htmlFor={ id }>
                { props.label }
            </label>
            <input
                id={ id }
                type={ props.inputType }
                value={ props.value }
                onChange={ props.onInputChange }
            ></input>
            {
                isInvalid(props) && 
                <p className='error-message'>
                    { props.errorMessage }
                </p>
            }
        </div>
    );
}

Input.defaultProps = {
    inputType: 'text',
}

export default Input;