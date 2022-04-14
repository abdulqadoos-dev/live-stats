import {
    DEFAULT_VIEW,
    SET_VIEW,
    SIGNUP_FAILD,
    SIGNUP_SUCCESS,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAILD,
    LOGIN_SUCCESS,
    LOGIN_FAILD,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAILD,
    REQUEST_START,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILD
} from "../constants/authConstants";

const INITIAL_STATE = {
    authUser: null,
    isLoading: false,
    signupForm: null,
    validations: null,
    verification: true,
    signature: null,
    error: null,
    message: null,
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
                verification: true,
                error: null,
                message: null
            }


        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authUser: action.user,
                validations: null,
                message: action?.message || null
            };

        case SIGNUP_FAILD:
            return {
                ...state,
                isLoading: false,
                authUser: null,
                error: action?.error || null,
                validations: action?.validationResults || null,
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
                signature: action.token
            };


        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authUser: action.result,
                validations: null,
                message: action?.message || null
            };
        case LOGIN_FAILD:
            return {
                ...state,
                isLoading: false,
                authUser: null,
                error: action?.error || null,
                validations: action?.validationResults || null,
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
                activeView: DEFAULT_VIEW
            };

        case CHANGE_PASSWORD_FAILD:
            return {
                ...state,
                isLoading: false,
                validations: action.error.validationResult,
            };

        default:
            return state;
    }

};

export default auth;