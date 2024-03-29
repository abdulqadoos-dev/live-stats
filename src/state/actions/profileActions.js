import * as profileApi from "../apis/profileApi";

import {requestStart, validationResults} from "./appActions";
import {
    BASE_PATH,
    CREATING_FEED_PATH, FAN_ROLE_ID, FANS_PATH, LOCAL_STORAGE_AUTH_USER,
    LOCATION_DETAILS_PATH,
    SCHOOL_AND_SPORT_PATH,
    SETUP_PROFILE_PATH,
    STATUS_CODE_400, TEAMS_PATH
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
export const getProfileRequest = (navigate, roleId = null) => {
    return (dispatch) => {
        dispatch(requestStart());
        const promise = profileApi.getProfile()

        promise.then((result) => {
            const authUser = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
            authUser.user.profile = result.data.profile
            window.localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(authUser));
            setTimeout(() => roleId && roleId === FAN_ROLE_ID ? navigate(FANS_PATH) :navigate(TEAMS_PATH), 1000)
        }).catch((error) => {
            navigate(SETUP_PROFILE_PATH)
        });
        return promise

    }
}