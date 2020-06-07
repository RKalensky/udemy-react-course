import React from 'react';
import './index.styl';

export default (props) => {
    const cls = [
        'brand-button',
        props.customClass || ''
    ]
    return (
        <button
            onClick={props.onClickHandler}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            { props.children }
        </button>
    );
}