import {CHANGE_STATE_VALUE, REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";


export const testAction = () => {
    console.log("test action is working");
}


export const requestStart = () => ({type: REQUEST_START});

export const validationResults = (validationResults = null, message = null, error = null) => ({
    type: VALIDATION_RESULTS,
    validationResults,
    message,
    error
});


export const changeStateValue = (key, value) => ({
    type: CHANGE_STATE_VALUE,
    key: key,
    value: value
})