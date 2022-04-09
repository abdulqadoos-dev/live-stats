import { SIGNUP_FAILD, SIGNUP_START, SIGNUP_SUCCESS } from "../constants/authConstants";

const INITIAL_STATE = {
    
    authUser: null,

    signupForm: null,
    isLoadingSignup: false,
    signupValidations: null,
};

const auth = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case SIGNUP_START:
            return {
                ...state,
                isLoadingSignup: true
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoadingSignup: false,
                authUser: action.user,
            };

        case SIGNUP_FAILD:
            return {
                ...state,
                isLoadingSignup: false,
                signupValidations: action.validationResult,
            };

        default: return state;
    }

};

export default auth;