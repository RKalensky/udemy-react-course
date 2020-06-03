import React from 'react';
import './index.styl';

export default (props) => {
    const activeClass = props.answerState && props.answerState[props.answer.id]  ? props.answerState[props.answer.id].currentClass : '';

    const classesNames = ['answers-list-item', activeClass].join(' ');
    return (
        <li
            className={classesNames}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    );
}