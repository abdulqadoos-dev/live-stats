import {requestStart} from "./appActions";
import * as gamesApi from "../apis/gamesApi";
import { GAMES_PATH} from "../constants/Constans";
import {
    CHANGE_GAME_STATE,
    GETTING_GAMES_FAILED,
    GETTING_GAMES_SUCCESS,
    SET_GAMES_FORM
} from "../constants/gamesConstants";
import {getAllTeams} from "../apis/gamesApi";

export const setRosterForm = formData => {
    return (dispatch) => {
        dispatch({
            type: SET_GAMES_FORM,
            ...formData
        })
    }
}



export const changeGameState = (key, value) => ({
    type: CHANGE_GAME_STATE,
    key: key,
    value: value
})


export const getGamesRequest = (profileId, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = gamesApi.getGames(profileId)
        promise.then((result) => {
            dispatch({type: GETTING_GAMES_SUCCESS, ...result.data})
        }).catch((error) => {
            dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
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
            navigate(GAMES_PATH)

        }).catch((error) => {

            if(error.status === 400){
                dispatch({type: GETTING_GAMES_FAILED, error: Object.values(error.data?.validationResults || {}).join('; ')});
            }else {
                dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
            }
            // navigate(GAMES_PATH)

        });

        return promise

    }
}



export const updateGameDetailsRequest = (formData, navigate = null) => {

    return (dispatch) => {
        dispatch(requestStart());
        const promise = gamesApi.updateGameDetails(formData)
        promise.then((result) => {
            dispatch({type: GETTING_GAMES_SUCCESS, ...result.data})
            navigate && navigate(GAMES_PATH)
        }).catch((error) => {
            if(error.status === 400){
                dispatch({type: GETTING_GAMES_FAILED, error: Object.values(error.data?.validationResults || {}).join('; ')});
            }else {
                dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
            }
        });
        return promise
    }
}

export const verifyScheduleTime = (formData) => {
    return gamesApi.verifyGameScheduleTime(formData)
}

export const getTeams = () => {
    return getAllTeams()
}

export const getGamesBySportRequest = (sportId, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = gamesApi.getGamesBySportId(sportId)
        promise.then((result) => {
            dispatch({type: GETTING_GAMES_SUCCESS, ...result.data})
        }).catch((error) => {
            dispatch({type: GETTING_GAMES_FAILED, error: "Request Failed Try again!"});
        });

        return promise

    }

}