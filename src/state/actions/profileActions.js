import * as profileApi from "../../apis/profileApi";

import {requestStart} from "./appActions";
import {CREATING_FEED_PATH} from "../constants/Constans";
import {CREATE_FAN_PROFILE_FAILED, CREATE_FAN_PROFILE_SUCCESS, SET_PROFILE_FORM} from "../constants/profileConstants";

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
            dispatch({
                type: CREATE_FAN_PROFILE_SUCCESS,
            })
            console.log(result);
            // navigate(CREATING_FEED_PATH)
        }).catch((error) => {
            dispatch({
                type: CREATE_FAN_PROFILE_FAILED
            })
            console.log(error)
        });
        return promise

    }
}