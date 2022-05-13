import {
    CREATE_FAN_PROFILE_FAILED,
    CREATE_FAN_PROFILE_SUCCESS,
    CREATE_TEAM_PROFILE_FAILED,
    SET_PROFILE_FORM
} from "../constants/profileConstants";
import {REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";

const INITIAL_STATE = {
    isLoading: false,
    profile: null,
    formData: null,

    error: null,
    message: null,
    validations: null,
}

const profile = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {...state, isLoading: true}
        case SET_PROFILE_FORM:
            return {...state, formData: action.formData}
        case CREATE_FAN_PROFILE_SUCCESS:
            return {...state, isLoading: false, validations: null}

        case CREATE_FAN_PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
                validations: action?.validationResults || null,
            }

        case CREATE_TEAM_PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
                validations: action?.validationResults || null,
            }

        case VALIDATION_RESULTS:
            return {
                ...state,
                isLoading: false,
                error: action?.errors || null,
                message: action?.message || null,
                validations: action?.validationResults || null,
            }
        default:
            return state
    }
}

export default profile;