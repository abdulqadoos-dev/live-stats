import {
    OTP_VERIFICATION_VIEW, SIGNUP_FAILD,
    SIGNUP_SUCCESS, SET_VIEW, DEFAULT_VIEW,
    VERIFICATION_SUCCESS, VERIFICATION_FAILD,
    LOGIN_SUCCESS, LOGIN_FAILD,
    FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAILD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILD, LOGOUT_SUCCESS
} from "../constants/authConstants";

import * as authApi from '../apis/authApi';
import {
    FAN_ROLE_ID, FANS_PATH,
    LOCAL_STORAGE_AUTH_USER,
    LOGIN_PATH, SETUP_PROFILE_PATH,
    STATUS_CODE_400, TEAM_ROLE_ID, TEAMS_PATH,
} from "../constants/Constans";
import {requestStart} from "./appActions";


export const setView = (view) => {
    return {
        type: SET_VIEW,
        view
    }
}


export const signupSuccess = (message) => {
    return {
        type: SIGNUP_SUCCESS,
        ...message
    }
}

export const signupFailed = (error) => {
    return {
        type: SIGNUP_FAILD,
        ...error
    }
}


export const signupRequest = (formData) => {

    return (dispatch) => {

        dispatch(requestStart());

        const promise = authApi.signup(formData);

        promise
            .then((result) => {
                dispatch(signupSuccess(result.data));
                dispatch(setView(OTP_VERIFICATION_VIEW));
            })
            .catch((error) => {
                error.status === STATUS_CODE_400 ? dispatch(signupFailed(error.data)) : dispatch(signupFailed({error: "signup failed try again!"}))
            });

        return promise;
    }
}


export const verificationSuccess = (response) => {
    return {
        type: VERIFICATION_SUCCESS,
        ...response
    }
}

export const verificationFailed = (error) => {
    return {
        type: VERIFICATION_FAILD,
        ...error
    }
}


export const verificationRequest = (formData, navigate = null, activeView = DEFAULT_VIEW) => {
    return (dispatch) => {

        dispatch(requestStart());

        const promise = authApi.verifyOtp(formData);

        promise
            .then((result) => {
                dispatch(verificationSuccess(result.data.data));
                dispatch(setView(activeView));
                navigate && navigate(LOGIN_PATH);
            })
            .catch((error) => {
                error.status === STATUS_CODE_400 ? dispatch(verificationFailed(error.data)) : dispatch(verificationFailed({error: "opt failed try again!"}))
            });

        return promise;
    }
}


export const loginSuccess = (result) => {
    return {
        type: LOGIN_SUCCESS,
        result
    }
}

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILD,
        ...error
    }
}


export const loginRequest = (formData, navigate) => {
    return (dispatch) => {

        dispatch(requestStart());

        const promise = authApi.login(formData);

        promise
            .then((result) => {
                dispatch(loginSuccess(result.data));
                window.localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(result.data));
                if (result?.data?.user?.profile) {
                    switch (result.data.user.roleId) {
                        case FAN_ROLE_ID :
                            return navigate(FANS_PATH)
                        case TEAM_ROLE_ID :
                            return navigate(TEAMS_PATH)
                    }
                } else navigate(SETUP_PROFILE_PATH);
            })
            .catch((error) => {
                error.status === STATUS_CODE_400 ? dispatch(loginFailed(error.data)) : dispatch(loginFailed({error: "Invalid credentials"}));
            });

        return promise;
    }
}


export const forgetPasswordSuccess = (result) => {
    return {
        type: FORGET_PASSWORD_SUCCESS,
        ...result
    }
}

export const forgetPasswordFailed = (error) => {
    return {
        type: FORGET_PASSWORD_FAILD,
        ...error
    }
}


export const forgetPasswordRequest = (formData) => {
    return (dispatch) => {

        dispatch(requestStart());

        const promise = authApi.forgetPassword(formData);

        promise
            .then((result) => {
                dispatch(forgetPasswordSuccess(result.data));
                dispatch(setView(OTP_VERIFICATION_VIEW));
            })
            .catch((error) => {
                error.status === STATUS_CODE_400 ? dispatch(forgetPasswordFailed(error.data)) : dispatch(forgetPasswordFailed({error: "Request Failed Try again!"}));
            });

        return promise;
    }
}


export const changePasswordSuccess = (result) => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        result
    }
}

export const changePasswordFailed = (error) => {
    return {
        type: CHANGE_PASSWORD_FAILD,
        ...error
    }
}


export const changePasswordRequest = (formData, navigate) => {
    return (dispatch) => {

        dispatch(requestStart());

        const promise = authApi.resetPassword(formData);

        promise
            .then((result) => {
                dispatch(changePasswordSuccess(result.data.data));
                navigate(LOGIN_PATH)
            })
            .catch((error) => {
                dispatch(changePasswordFailed(error.data))
            });

        return promise;
    }
}


export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}


export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(requestStart());
        window.localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
        dispatch(logoutSuccess());
        navigate(LOGIN_PATH)
    }
}


