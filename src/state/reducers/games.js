import { REQUEST_START, VALIDATION_RESULTS} from "../constants/Constans";
import {CHANGE_GAME_STATE, GETTING_GAMES_FAILED, GETTING_GAMES_SUCCESS} from "../constants/gamesConstants";

const INITIAL_STATE = {

    isLoading: false,

    game: null,
    games: null,
    formData: null,

    error: null,
    message: null,
    validations: null,

    startGameModal: null,
}

const games = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHANGE_GAME_STATE :
            return {...state, [action.key]: action.value}

        case REQUEST_START:
            return {...state, isLoading: true}

        case GETTING_GAMES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                games: action.games,
                error: null
            }

        case GETTING_GAMES_FAILED:
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

export default games;