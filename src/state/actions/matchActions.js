import {requestStart} from "./appActions";
import {GAMES_BOARD_PATH} from "../constants/Constans";
import {
    CHANGE_MATCH_STATE,
    GETTING_MATCH_FAILED,
    GETTING_MATCH_SUCCESS,
    UPDATING_MATCH_FAILED,
    UPDATING_MATCH_SUCCESS
} from "../constants/matchConstants";
import * as matchApi from "../apis/matchApi";


export const changeMatchState = (key, value) => ({
    type: CHANGE_MATCH_STATE,
    key: key,
    value: value
})


export const createMatchRequest = (formData, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = matchApi.createMatch(formData)

        promise.then((result) => {

            dispatch({type: GETTING_MATCH_SUCCESS, ...result.data})
            navigate(GAMES_BOARD_PATH)

        }).catch((error) => {

            if (error.status === 400) {
                dispatch({
                    type: GETTING_MATCH_FAILED,
                    error: Object.values(error.data?.validationResults || {}).join('; ')
                });
            } else {
                dispatch({type: GETTING_MATCH_FAILED, error: "Request Failed Try again!"});
            }

        });

        return promise

    }
}

export const updateMatchRequest = (formData, navigate) => {

    return (dispatch) => {

        // dispatch({type: GETTING_MATCH_SUCCESS, ...result.data})
        // navigate(GAMES_BOARD_PATH)

        dispatch(requestStart());

        const promise = matchApi.updateMatch(formData)

        // promise.then((result) => {
        //
        //     dispatch({type: GETTING_MATCH_SUCCESS, ...result.data})
        //     navigate(GAMES_BOARD_PATH)
        //
        // }).catch((error) => {
        //
        //     if (error.status === 400) {
        //         dispatch({
        //             type: UPDATING_MATCH_FAILED,
        //             error: Object.values(error.data?.validationResults || {}).join('; ')
        //         });
        //     } else {
        //         dispatch({type: UPDATING_MATCH_FAILED, error: "Request Failed Try again!"});
        //     }
        //
        // });

        return promise

    }
}


export const getMatchRequest = (id, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());
        const promise = matchApi.getMatchByGameId(id)
        // promise.then((result) => {
        //     if (result?.data?.matches[0]) {
        //         dispatch({type: GETTING_MATCH_SUCCESS, match: {...result.data.matches[0]}})
        //     } else {
        //         navigate(TEAMS_PATH)
        //     }
        // }).catch((error) => {
        //     dispatch({type: GETTING_MATCH_FAILED, error: "Request Failed Try again!"});
        // });

        return promise


    }
}

