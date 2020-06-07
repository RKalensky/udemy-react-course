import React from 'react';
import Button from '../Button'
import './index.styl';

export default (props) => {
    const overallResults = Object.values(props.results).reduce((acc, curr) => {
        return acc += curr === 'correct' ? 1 : 0;
    }, 0);

    return (
        <div className='finished-quiz'>
            <h1>Grats! you've passed that awesome quiz</h1>
            <p>You've got {overallResults} of {props.quiz.length} right answers</p>
            <ul>
                { props.quiz.map((item, index) => {
                    return (
                        <li 
                            key={item.id}
                            className={props.results[item.id]}
                        >
                            {index + 1}. {item.question}
                        </li>
                    )
                }) }
            </ul>
            <div>
                <Button
                    onClickHandler={props.onRetryClick}
                >
                    Want to retry?
                </Button>
            </div>
        </div>
    )
}