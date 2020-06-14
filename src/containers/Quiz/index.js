import React from 'react';
import './index.styl';
import QuizItem from '../../components/QuizItem';
import FinishedQuiz from '../../components/FinishedQuiz';
import { debounce } from '../../utils/debounce';
import { cloneSimpleStructure } from '../../utils/cloneSimpleStructures';

const quizInitialState = {
    results: {},
    answerState: null,
    activeQuestionPosition: 0,
    isFinished: false,
}

const initialState = {
    ...quizInitialState,
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
        },
        {
            id: 3,
            question: 'What is the result of (2+2)*2?',
            rightAnswerId: 1,
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
        this.checkAnswerPromisify = debounce(this.checkAnswer, 2000);
        this.startNextQuestionPromisify = debounce(this.startNextQuestion, 1000);
    }

    checkAnswer = (answerId) => {
        const currentQuestion = this.state.quiz[this.state.activeQuestionPosition];
        const currentQuestionId = currentQuestion.id;
        const correctAnswerId = currentQuestion.rightAnswerId;
        const result = correctAnswerId === answerId ? 'correct' : 'incorrect';
        this.setState((prevState) => {
            return {
                results: {
                    ...prevState.results,
                    [currentQuestionId]: result
                },
                answerState: {
                    [answerId]: {
                        currentClass: result
                    }
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
        }
    }

    reset() {
        this.setState({
            ...quizInitialState
        });
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
            await this.startNextQuestionPromisify();
        }
    }

    onRetry = () => {
        this.reset();
    }

    render() {
        return (
            <div className='quiz'>
                {
                    this.state.isFinished
                        ? 
                            <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetryClick={this.onRetry}
                            ></FinishedQuiz>
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