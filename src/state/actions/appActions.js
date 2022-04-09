import { DECREMENT, INCREMENT, SIGNUP_FAILD, SIGNUP_SUCCESS } from "../constants/app.constants";
import * as appApi from '../../Services/Apis/appApi';

export const testAction = () => {
    console.log("test action is working");
}

export const signupSuccess = (result) => {
    return {
        type: SIGNUP_SUCCESS,
        result
    }
}

export const signupFaild = (error) => {
    return {
        type: SIGNUP_FAILD,
        error
    }
}


export const signupRequest = (formData) => {
    return (dispatch) => {

        const promise = appApi.signup(formData);

        promise
            .then((result) => {
                dispatch(signupSuccess(result));
            })
            .catch((error) => {
                dispatch(signupFaild(error));
            });

        return promise;
    }
}

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};
