import {SET_PROFILE_FORM} from "../constants/profileConstants";
import {REQUEST_START} from "../constants/Constans";

const INITIAL_STATE = {
    isLoading: false,
    profile: null,
    formData: null
}

const profile = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {...state, isLoading: true}
        case SET_PROFILE_FORM:
            return {...state, formData: action.formData}
        default:
            return state
    }
}

export default profile;