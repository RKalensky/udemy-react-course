import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.styl';

export default class QuizList extends React.Component {
    renderQuizList = () => {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <NavLink key={index} to={`/quiz/${quiz}`}>
                    <li>
                        Test { quiz }
                    </li>
                </NavLink>
            );
        })
    }

    render() {
        return (
            <div className='quiz-list'>
                <h1>Quiz List</h1>
                <ul>
                    { this.renderQuizList() }
                </ul>
            </div>
        )
    }
}
