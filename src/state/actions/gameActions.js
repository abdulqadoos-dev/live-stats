import {requestStart} from "./appActions";
import * as gamesApi from "../apis/gamesApi";
import {GAMES_PATH} from "../constants/Constans";
import {GETTING_GAMES_FAILED, GETTING_GAMES_SUCCESS, SET_GAMES_FORM} from "../constants/gamesConstants";

export const setRosterForm = formData => {
    return (dispatch) => {
        dispatch({
            type: SET_GAMES_FORM,
            ...formData
        })
    }
}


export const getGamesRequest = (profileId, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = gamesApi.getGames(profileId)

        promise.then((result) => {

            dispatch({type: GETTING_GAMES_SUCCESS, ...result.data})

        }).catch((error) => {

            dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
            navigate(GAMES_PATH)

        });

        return promise

    }

}

export const createGameRequest = (formData, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = gamesApi.createGame(formData)

        promise.then((result) => {

            dispatch({type: GETTING_GAMES_SUCCESS, ...result.data})

        }).catch((error) => {

            dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
            navigate(GAMES_PATH)

        });

        return promise

    }
}
