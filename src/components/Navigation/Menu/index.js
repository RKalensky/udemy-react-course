import React, { useCallback } from 'react';
import './index.styl';
import MenuItem from '../MenuItem';
import Backdrop from '../../Backdrop';

const links = [1, 2, 3];

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
                    { links.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                            >
                                { `Link ${item}` }
                            </MenuItem>
                        )
                    }) }
                </ul>
            </nav>
        </React.Fragment>
    )
}