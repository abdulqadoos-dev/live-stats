import * as profileApi from "../apis/profileApi";

import {requestStart, validationResults} from "./appActions";
import {
    CREATING_FEED_PATH,
    LOCATION_DETAILS_PATH,
    SCHOOL_AND_SPORT_PATH,
    SETUP_PROFILE_PATH,
    STATUS_CODE_400
} from "../constants/Constans";

import {
    CREATE_FAN_PROFILE_FAILED,
    CREATE_FAN_PROFILE_SUCCESS, CREATE_TEAM_PROFILE_FAILED,
    CREATE_TEAM_PROFILE_SUCCESS,
    SET_PROFILE_FORM
} from "../constants/profileConstants";


export const setProfileForm = formData => {
    return (dispatch) => {
        dispatch({
            type: SET_PROFILE_FORM,
            ...formData
        })
    }
}


export const createFanProfileRequest = (formData, navigate) => {
    return (dispatch) => {
        dispatch(requestStart());

        const promise = profileApi.createFanProfile(formData)

        promise.then((result) => {

            dispatch({type: CREATE_FAN_PROFILE_SUCCESS})
            navigate(CREATING_FEED_PATH)

        }).catch((error) => {

            if (error.status === STATUS_CODE_400) {
                dispatch(validationResults(error.data))
                return navigate(LOCATION_DETAILS_PATH)
            }
            dispatch({type: CREATE_FAN_PROFILE_FAILED, error: "Request Failed Try again!"});
            navigate(SETUP_PROFILE_PATH)

        });
        return promise

    }
}

export const createTeamProfileRequest = (formData, navigate) => {
    return (dispatch) => {
        dispatch(requestStart());

        const promise = profileApi.createTeamProfile(formData)

        promise.then((result) => {

            dispatch({type: CREATE_TEAM_PROFILE_SUCCESS})
            navigate(CREATING_FEED_PATH)

        }).catch((error) => {

            if (error.status === STATUS_CODE_400) {
                dispatch(validationResults(error.data))
                return navigate(SCHOOL_AND_SPORT_PATH)
            }
            dispatch({type: CREATE_TEAM_PROFILE_FAILED, error: "Request Failed Try again!"});
            navigate(SETUP_PROFILE_PATH)

        });
        return promise

    }
}