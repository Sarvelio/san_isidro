import {
    email,
    composeValidators,
    alphanumeric,
    required,
    date,
    password,
    maxLength,
    minLength,
    soloNumeros
} from "../../validations";

export const Validations = (validations) => {
    const _validations = []
    required, email
    if (validations.includes("required")) {
        _validations.push(required)
    }
    if (validations.includes("email")) {
        _validations.push(email)
    }
    if (validations.includes("password")) {
        _validations.push(password)
    }
    if (validations.includes("date")) {
        _validations.push(date)
    }
    if (validations.includes("alphanumeric")) {
        _validations.push(alphanumeric)
    }
    if (validations.includes("maxLength-20")) {
        _validations.push(maxLength(20))
    }
    if (validations.includes("maxLength-250")) {
        _validations.push(maxLength(250))
    }
    if (validations.includes("maxLength-150")) {
        _validations.push(maxLength(150))
    }
    if (validations.includes('validacion-dpi')) {
        _validations.push(minLength(13))
        _validations.push(maxLength(13))
    }
    if (validations.includes('validacion-8')) {
        _validations.push(minLength(8))
        _validations.push(maxLength(8))
    }
    if (validations.includes('validacion-2')) {
        _validations.push(minLength(1))
        _validations.push(maxLength(2))
    }
    if (validations.includes('numerico')) {
        _validations.push(soloNumeros)
    }

    return { validate: composeValidators(..._validations) }
}