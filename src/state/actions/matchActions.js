import {requestStart} from "./appActions";
import {GAMES_BOARD_PATH, GAMES_PATH} from "../constants/Constans";
import {GETTING_MATCH_FAILED, GETTING_MATCH_SUCCESS} from "../constants/matchConstants";
import * as matchApi from "../apis/matchApi";

export const createMatchRequest = (formData, navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = matchApi.createMatch(formData)

        promise.then((result) => {

            dispatch({type: GETTING_MATCH_SUCCESS, ...result.data})
            navigate(GAMES_BOARD_PATH)

        }).catch((error) => {

            if(error.status === 400){
                dispatch({type: GETTING_MATCH_FAILED, error: Object.values(error.data?.validationResults || {}).join('; ')});
            }else {
                dispatch({type: GETTING_MATCH_FAILED, error: "Request Failed Try again!"});
            }
            // navigate(GAMES_PATH)

        });

        return promise

    }
}