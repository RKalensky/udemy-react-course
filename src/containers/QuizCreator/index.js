import React from 'react';
import './index.styl';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { createFormControl } from '../../config/formControls';
import { cloneSimpleStructure } from '../../utils/cloneSimpleStructures';
import validation from '../../utils/formValidations';
import Select from '../../components/UI/Select';
import generateId from '../../utils/generateId';

const initialFormControls = {
    ...(() => {
        const data = {
            question: createFormControl({
                label: 'Enter question', 
            }),
            option1: createFormControl({
                label: 'Answer 1',
            }),
            option2: createFormControl({
                label: 'Answer 2'
            }),
            option3: createFormControl({
                label: 'Answer 3'
            }),
            option4: createFormControl({
                label: 'Answer 4'
            })
        }

        return Object.entries(data).reduce((acc, curr) => ({ ...acc, [curr[0]]: { ...curr[1], id: curr[0] } }), {});
    })()
};

export default class QuizCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            quiz: [],
            rightAnswerId: 1,
            formControls: cloneSimpleStructure(initialFormControls)
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    updateStateOnChange({ id, value, typing = false, valid = false }, cb) {
        this.setState((prevState) => {
            const clonedFormControlsState = cloneSimpleStructure(prevState.formControls);
            const targetControl = clonedFormControlsState[id];
            return {
                formControls: {
                    ...clonedFormControlsState,
                    [id]: {
                        ...targetControl,
                        touched: true,
                        typing,
                        value,
                        valid
                    }
                }
            }
        }, cb);
    }

    updateFormValidState = () => {
        const isFormValid = Object.values(this.state.formControls).every(({ valid, typing }) => valid && !typing);
        this.setState({ isFormValid });
    }

    onInputChange({ id, validationMethod }, event) {
        const { target: { value } } = event;
        this.updateStateOnChange({ id, value }, this.updateFormValidState);
        if (validationMethod) {
            this.setState({ isFormValid: false })
            this.updateStateOnChange({ id, value, typing: true }, this.updateFormValidState);
            const valid = validation[validationMethod](value);
            this.updateStateOnChange({ id, value, typing: false, valid }, this.updateFormValidState);
        }
    }

    renderInputs() {
        return Object.values(this.state.formControls).map((control, index) => {
            const targetProps = {
                ...control,
                onInputChange: this.onInputChange.bind(this, control)
            }
            return (
                <React.Fragment key={ control.id }>
                    <Input
                        { ...targetProps }
                    ></Input>
                    { !index ? <hr/> : null }
                </React.Fragment>
            );
        })
    }

    reset() {
        this.setState({formControls: cloneSimpleStructure(initialFormControls)});
    }

    onSelectChangeHandler = ({ target: { value } }) => {
        console.log(value);
        this.setState({
            rightAnswerId: Number(value)
        });
    }

    mapSelectOptions(cb) {
        return Object.values(this.state.formControls).slice(1).map(cb);
    }

    addQuestion = () => {
        this.setState((prevState) => {
            const { formControls } = prevState;
            return {
                quiz: [
                    ...prevState.quiz,
                    {
                        id: generateId(),
                        question: formControls.question.value,
                        rightAnswerId: prevState.rightAnswerId,
                        answers: this.mapSelectOptions(({ value }, index) => (
                            { text: value, id: index + 1 }
                        ))
                    }
                ]
            }
        })
        this.reset();
    }

    saveQuiz = () => {
        console.log('saveQuiz');
    }

    render() {
        return (
            <div className='quiz-creator'>
                <h1>Quiz Creator</h1>
                <form onSubmit={this.submitHandler}>
                <fieldset>
                        { this.renderInputs() }
                    </fieldset>
                    <fieldset>
                        <Select
                            label='Choose right answer'
                            value={ this.state.rightAnswerId }
                            onSelectChange={ this.onSelectChangeHandler }
                            options={
                                this.mapSelectOptions((selectOption, index) => {
                                    return {
                                        content: `Answer ${index + 1}`,
                                        value: index + 1
                                    };
                                })
                            }
                        ></Select>
                    </fieldset>
                    <fieldset>
                        <div className='buttons-wrapper'>
                            <Button
                                onClickHandler={this.addQuestion}
                                disabled={!this.state.isFormValid}
                            >
                                add Question
                            </Button>
                            <Button
                                onClickHandler={this.saveQuiz}
                                disabled={!this.state.isFormValid}
                            >
                                save Quiz
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}
