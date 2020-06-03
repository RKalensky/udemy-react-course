import React from 'react';
import classes from './index.module.css';
import AnswersList from '../AnswersList';

export default (props) => {
    return (
        <div className={classes.QuizItem}>
            <p className={classes.QuizItemCaption}>
                <span>{props.questionPosition + 1}. {props.question}</span>
                <span className={classes.Counter}>{props.questionPosition + 1} of {props.questionsCount}</span>
            </p>

            <AnswersList
                answers={props.answers}
                answerState={props.answerState}
                onAnswerClick={props.onAnswerClick}
            ></AnswersList>
        </div>
    );
}