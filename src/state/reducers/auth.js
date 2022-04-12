import { DEFAULT_VIEW, SET_VIEW, SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS, VERIFICATION_START, VERIFICATION_SUCCESS, VERIFICATION_FAILD, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, FORGET_PASSWORD_START, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILD, REQUEST_START, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILD } from "../constants/authConstants";

const INITIAL_STATE = {
    authUser: null,
    isLoading: false,
    signupForm: null,
    validations: null,
    verification: true,
    signature: null,
    activeView: DEFAULT_VIEW
};

const auth = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_VIEW:
            return {
                ...state,
                isLoading: false,
                activeView: action.view
            }

        case REQUEST_START:
            return {
                ...state,
                isLoading: true,
                validations: null,
                verification: true
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authUser: action.result,
            };

        case SIGNUP_FAILD:
            return {
                ...state,
                isLoading: false,
                validations: action.validationResult,
            };


        case VERIFICATION_FAILD:
            return {
                ...state,
                isLoading: false,
                verification: false
            };

        case VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };



        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authUser: action.result,
            };

        case LOGIN_FAILD:
            return {
                ...state,
                isLoading: false,
                validations: action.validationResult,
            };


        case FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                validations: null,
                authUser: action.result,
            };

        case FORGET_PASSWORD_FAILD:
            return {
                ...state,
                isLoading: false,
                validations: action.error.validationResult,
            };

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                validations: null,
                authUser: action.result,
            };

        case CHANGE_PASSWORD_FAILD:
            return {
                ...state,
                isLoading: false,
                validations: action.error.validationResult,
            };

        default: return state;
    }

};

export default auth;