import React from 'react';
import './index.styl';
import QuizItem from '../../components/QuizItem';
import FinishedQuiz from '../../components/FinishedQuiz';
import { promisifyWithDelay } from '../../utils/delayPromise';
import { cloneSimpleStructure } from '../../utils/cloneSimpleStructures';

const initialState = {
    answerState: null,
    activeQuestionPosition: 0,
    isFinished: false,
    quiz: [
        {
            id: 1,
            question: 'What is the result of 2+2?',
            rightAnswerId: 4,
            answers: [
                {text: '1', id: 1},
                {text: '2', id: 2},
                {text: '3', id: 3},
                {text: '4', id: 4}
            ]
        },
        {
            id: 2,
            question: 'What is the result of 2+2*2?',
            rightAnswerId: 2,
            answers: [
                {text: '8', id: 1},
                {text: '6', id: 2},
                {text: '7', id: 3},
                {text: '10', id: 4}
            ]
        }
    ],
}

export default class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = cloneSimpleStructure(initialState);
        this.checkAnswerPromisify = promisifyWithDelay(this.checkAnswer);
        this.startNextQuestionPromisify = promisifyWithDelay(this.startNextQuestion, 1500);
    }

    checkAnswer = (answerId) => {
        const correctAnswerId = this.state.quiz[this.state.activeQuestionPosition].rightAnswerId;
        this.setState({
            answerState: {
                [answerId]: {
                    currentClass: correctAnswerId === answerId ? 'correct' : 'incorrect'
                }
            }
        });
    }

    isQuizFinished() {
        return this.state.activeQuestionPosition + 1 === this.state.quiz.length;
    }

    startNextQuestion = () => {
        if (this.isQuizFinished()) {
            this.setState({
                isFinished: true
            })
        } else {
            this.setState((prevState) => {
                return {
                    activeQuestionPosition: prevState.activeQuestionPosition + 1,
                    answerState: null
                }
            });
            console.log('answered');
        }
    }

    onAnswerHandler = async (answerId) => {
        if (!this.state.answerState) {
            this.setState({
                answerState: {
                    [answerId]: {
                        currentClass: 'pending'
                    }
                }
            });
    
            await this.checkAnswerPromisify(answerId);
            console.log('checkAnswerPromisify');
            await this.startNextQuestionPromisify();
        }
    }

    render() {
        return (
            <div className='quiz'>
                {
                    this.state.isFinished
                        ? 
                            <FinishedQuiz></FinishedQuiz>
                        : 
                            <React.Fragment>
                                <h1>Please fill the quiz</h1>
                                <div className='quiz-wrapper'>
                                    <QuizItem
                                        key={this.state.quiz[this.state.activeQuestionPosition].id}
                                        question={this.state.quiz[this.state.activeQuestionPosition].question}
                                        answers={this.state.quiz[this.state.activeQuestionPosition].answers}
                                        answerState={this.state.answerState}
                                        questionPosition={this.state.activeQuestionPosition}
                                        questionsCount={this.state.quiz.length}
                                        onAnswerClick={this.onAnswerHandler}
                                    ></QuizItem>
                                </div>
                            </React.Fragment>
                }
            </div>
        );
    }
}