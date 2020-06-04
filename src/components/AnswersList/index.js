import React from 'react';
import AnswersListItem from '../AnswersListItem';

export default (props) => {
    return (
        <ul>
            { props.answers.map((item, index) => {
                return (
                    <AnswersListItem
                        key={item.id}
                        answer={item}
                        answerState={props.answerState}
                        onAnswerClick={props.onAnswerClick}
                    ></AnswersListItem>
                );
            }) }
        </ul>
    );
}