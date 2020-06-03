import React from 'react';
import classes from './index.module.css';

export default (props) => {
    return (
        <div className={classes.FinishedQuiz}>
            <p>Grats! you've passed that awesome quiz</p>
            <p>You've got 1 of 2 right answers</p>
            <div>
                <button>Want to retry?</button>
            </div>
        </div>
    )
}