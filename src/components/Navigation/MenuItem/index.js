import React from 'react';
import './index.styl';
import { NavLink } from 'react-router-dom';

export default (props) => {
    return (
        <li className='menu-item'>
            <NavLink
                to={props.to}
                exact={props.exact}
                onClick={props.onClickHandler}
            >
                { props.children }
            </NavLink>
        </li>
    )
}