import {REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";
import {GETTING_ROSTERS_FAILED, GETTING_ROSTERS_SUCCESS} from "../constants/rosterConstans";

const INITIAL_STATE = {

    isLoading: false,

    roster: null,
    rosters: null,
    formData: null,

    error: null,
    message: null,
    validations: null,

}

const rosters = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {...state, isLoading: true}

        case GETTING_ROSTERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rosters: action.players
            }

        case GETTING_ROSTERS_FAILED:
            return {
                ...state,
                isLoading: false,
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

export default rosters;