import { DECREMENT, INCREMENT } from "../constants/appConstants";
import {REQUEST_START} from "../constants/Constans";


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


export const requestStart = () => ({type: REQUEST_START});