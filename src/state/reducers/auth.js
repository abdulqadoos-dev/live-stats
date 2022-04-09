import { DEFAULT_VIEW, SET_VIEW, SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS, VERIFICATION_START, VERIFICATION_SUCCESS, VERIFICATION_FAILD } from "../constants/authConstants";

const INITIAL_STATE = {

    authUser: null,

    signupForm: null,
    isLoadingSignup: false,
    signupValidations: null,

    verification: true,

    activeView: DEFAULT_VIEW
};

const auth = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SET_VIEW:
            return {
                ...state,
                isLoadingSignup: false,
                activeView: action.view
            }

        case SIGNUP_START:
            return {
                ...state,
                isLoadingSignup: true
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoadingSignup: false,
                authUser: action.result,
            };

        case SIGNUP_FAILD:
            return {
                ...state,
                isLoadingSignup: false,
                signupValidations: action.validationResult,
            };


        case VERIFICATION_START:
            return {
                ...state,
                isLoadingSignup: true
            }

        case VERIFICATION_FAILD:
            return {
                ...state,
                isLoadingSignup: false,
                verification: false
            };

        case VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoadingSignup: false,
            };



        default: return state;
    }

};

export default auth;