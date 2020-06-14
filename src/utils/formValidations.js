import { debounce } from "./debounce";

const emailValidation = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email);
}

const passwordValidation = (password) => {
    return password.trim().length > 6;
}

const isFilledInValidation = (data) => {
    return !!data.trim().length;
}

export default {
    emailValidation: debounce(emailValidation, 1500),
    passwordValidation: debounce(passwordValidation, 1500),
    isFilledInValidation: debounce(isFilledInValidation, 1500)
}
