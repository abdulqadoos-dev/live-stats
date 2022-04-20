import { DECREMENT, INCREMENT } from "../constants/appConstants";

import * as appApi from '../../Services/Apis/appApi';
import { VALIDATION_FAILD_CODE } from "../constants/Constans";

export const testAction = () => {
    console.log("test action is working");
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
