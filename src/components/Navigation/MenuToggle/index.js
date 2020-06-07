import React from 'react';
import './index.styl';

export default (props) => {
    const cls = [
        'menu-toggle',
        ...props.additionalClasses
    ];

    return (
        <div className={cls.join(' ')} onClick={props.onClickHandler}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}