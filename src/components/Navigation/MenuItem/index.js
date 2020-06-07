import React from 'react';
import './index.styl';

export default (props) => {
    return (
        <li className='menu-item'>
            <a href='.'>
                { props.children }
            </a>
        </li>
    )
}