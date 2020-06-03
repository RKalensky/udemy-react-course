import React from 'react';
import classes from './index.module.css';

export default (props) => {
    const activeClass = props.answerState && props.answerState[props.answer.id]  ? classes[props.answerState[props.answer.id].currentClass] : '';

    const classesNames = [classes.AnswersListItem, activeClass].join(' ');
    return (
        <li
            className={classesNames}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    );
}