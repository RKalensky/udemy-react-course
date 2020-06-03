import React from 'react';
import classes from './index.module.css';

export default class Layout extends React.Component {
    render() {
        return (
            <main className={classes.Layout}>
                { this.props.children }
            </main>
        );
    }
}
