import React from 'react';
import './index.styl';
import AnswersList from '../AnswersList';

export default (props) => {
    return (
        <div className='quiz-item'>
            <p className='quiz-item-caption'>
                <span>{props.questionPosition + 1}. {props.question}</span>
                <span className='counter'>{props.questionPosition + 1} of {props.questionsCount}</span>
            </p>

            <AnswersList
                answers={props.answers}
                answerState={props.answerState}
                onAnswerClick={props.onAnswerClick}
            ></AnswersList>
        </div>
    );
}