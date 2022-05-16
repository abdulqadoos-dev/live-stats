import {REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";
import {GETTING_GAMES_FAILED, GETTING_GAMES_SUCCESS} from "../constants/gamesConstants";

const INITIAL_STATE = {

    isLoading: false,

    game: null,
    games: null,
    formData: null,

    error: null,
    message: null,
    validations: null,

}

const games = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {...state, isLoading: true}

        case GETTING_GAMES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                games: action.games
            }

        case GETTING_GAMES_FAILED:
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

export default games;