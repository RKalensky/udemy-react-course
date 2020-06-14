import React from 'react';
import './index.styl';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { createFormControl } from '../../config/formControls';
import { cloneSimpleStructure } from '../../utils/cloneSimpleStructures';
import validation from '../../utils/formValidations';

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

        return Object.values(data).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    })()
};

export default class QuizCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            quiz: [],
            formControls: cloneSimpleStructure(initialFormControls)
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
    }

    updateStateOnChange({ id, value, typing = false, valid = false }) {
        const clonedFormControlsState = cloneSimpleStructure(this.state.formControls);
        const targetControl = clonedFormControlsState[id];

        this.setState({
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
        });
    }

    updateFormValidState() {
        const isFormValid = Object.values(this.state.formControls).every(({ valid, typing }) => valid && !typing);
        this.setState({isFormValid});
    }

    async onInputChange({ id, inputType, validationMethod }, event) {
        const { target: { value } } = event;
        this.updateStateOnChange({ id, value });
        if (validation) {
            this.setState({ isFormValid: false })
            this.updateStateOnChange({ id, value, typing: true });
            const valid = await validation[validationMethod](value);
            this.updateStateOnChange({ id, value, typing: false, valid });
        }

        this.updateFormValidState();
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

    onAddQuestion = () => {}

    saveQuiz = () => {
        console.log('saveQuiz');
        this.reset();
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
                        <select></select>
                    </fieldset>
                    <fieldset>
                        <Button
                            onClickHandler={this.onAddQuestion}
                        >
                            add Question
                        </Button>
                        <Button
                            onClickHandler={this.saveQuiz}
                        >
                            save Quiz
                        </Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
