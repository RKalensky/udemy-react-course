import React from 'react';
import Button from '../../components/UI/Button';
import './index.styl';
import Input from '../../components/UI/Input';
import { authFormControls } from '../../config/formControls';
import { cloneSimpleStructure } from '../../utils/cloneSimpleStructures';
import validation from './../../utils/formValidations';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            formControls: cloneSimpleStructure(authFormControls)
        };
    }

    signInHandler = () => {}
    
    registerHandler = () => {}
    
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
        if (validationMethod) {
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
                <Input
                    key={ control.id }
                    { ...targetProps }
                ></Input>
            );
        })
    }

    render() {
        return (
            <div className='auth'>
                <h1>Auth</h1>
                <form onSubmit={ this.submitHandler } autoComplete='none'>
                    <fieldset>
                        { this.renderInputs() }
                    </fieldset>
                    <fieldset>
                        <Button onClickHandler={ this.signInHandler } disabled={!this.state.isFormValid}>Sign in</Button>
                        <Button onClickHandler={ this.registerHandler } disabled={!this.state.isFormValid}>Register</Button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
