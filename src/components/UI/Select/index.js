import React from 'react';
import './index.styl';
import generateId from '../../../utils/generateId.js';

export default (props) => {
    const id = props.id || generateId();
    return (
        <div className='brand-select'>
            <label htmlFor={ id }>
                { props.label }
            </label>
            <select
                id={ id }
                value={ props.value }
                onChange={ props.onSelectChange }
            >
                { props.options.map((selectOption, index) => {
                    return (
                        <option
                            key={ selectOption.value }
                            value={ selectOption.value }
                        >{ selectOption.content }</option>
                    );
                }) }
            </select>
        </div>
    )
}
