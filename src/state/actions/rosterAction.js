import {requestStart} from "./appActions";
import * as rosterApi from "../../apis/rosterApi";
import {CREATING_FEED_PATH, ROSTERS_PATH, SETUP_PROFILE_PATH} from "../constants/Constans";
import {GETTING_ROSTERS_FAILED, GETTING_ROSTERS_SUCCESS, SET_ROSTER_FORM} from "../constants/rosterConstans";

export const setRosterForm = formData => {
    return (dispatch) => {
        dispatch({
            type: SET_ROSTER_FORM,
            ...formData
        })
    }
}


export const getRostersRequest = (profileId,navigate) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = rosterApi.getRosters(profileId)

        promise.then((result) => {
            console.log(result);
            dispatch({type: GETTING_ROSTERS_SUCCESS, ...result.data})
            // navigate(CREATING_FEED_PATH)

        }).catch((error) => {

            dispatch({type: GETTING_ROSTERS_FAILED, error: "Request Failed Try again!"});
            navigate(ROSTERS_PATH)

        });

        return promise

    }

}
