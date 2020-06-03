import React from 'react';
import './index.styl';

export default (props) => {
    return (
        <div className='finished-quiz'>
            <h1>Grats! you've passed that awesome quiz</h1>
            <p>You've got 1 of 2 right answers</p>
            <div>
                <button>Want to retry?</button>
            </div>
        </div>
    )
}