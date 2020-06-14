import React from 'react';
import './index.styl';
import MenuItem from '../MenuItem';
import Backdrop from '../../UI/Backdrop';
import menuLinks from '../../../config/menuLinks';

const links = menuLinks

export default (props) => {
    const cls = [
        'menu',
        ...props.additionalClasses
    ];

    const isOpened = props.additionalClasses.includes('opened');

    return (
        <React.Fragment>
            { isOpened && <Backdrop></Backdrop> }
            <nav className={ cls.join(' ') }>
                <ul>
                    { links.map((item) => {
                        return (
                            <MenuItem
                                key={item.id}
                                to={item.to}
                                exact={item.exact}
                                onClickHandler={props.closeMenuHandler}
                            >
                                { item.label }
                            </MenuItem>
                        )
                    }) }
                </ul>
            </nav>
        </React.Fragment>
    )
}