import { REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";
import {CHANGE_MATCH_STATE, GETTING_MATCH_FAILED, GETTING_MATCH_SUCCESS} from "../constants/matchConstants";

const INITIAL_STATE = {

    isLoading: false,

    match: null,
    matches: null,
    matchForm: null,

    error: null,
    message: null,
    validations: null,

    stats: null
}

const matches = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHANGE_MATCH_STATE :
            return {...state, [action.key]: action.value}

        case REQUEST_START:
            return {...state, isLoading: true}

        case GETTING_MATCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                match: action.match,
                error: null
            }

        case GETTING_MATCH_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action?.error || null
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

export default matches;