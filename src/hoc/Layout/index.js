import React from 'react';
import './index.styl';

export default class Layout extends React.Component {
    render() {
        return (
            <main className='layout'>
                { this.props.children }
            </main>
        );
    }
}
