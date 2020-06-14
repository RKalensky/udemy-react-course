import generateId from "../utils/generateId";

const preDefinedProps = {
    valid: false,
    touched: false,
    typing: false,
    value: '',
}

const createFormControl = (data) => {
    return {
        id: generateId(),
        inputType: 'text',
        label: 'Common text',
        errorMessage: 'Input shouldn\'t be empty',
        validationMethod: 'isFilledInValidation',
        ...preDefinedProps,
        ...data
    }
}

const authFormControls = {
    emailControl: {
        ...createFormControl({
            id: 'emailControl',
            inputType: 'email',
            label: 'Email',
            errorMessage: 'Invalid email',
            validationMethod: 'emailValidation'
        })
    },
    passwordControl: {
        ...createFormControl({
            id: 'passwordControl',
            inputType: 'password',
            label: 'Password',
            errorMessage: 'Password length shouldn\'t be less than 7 characters',
            validationMethod: 'passwordValidation'
        })
    }
}

export {
    authFormControls,
    createFormControl
};