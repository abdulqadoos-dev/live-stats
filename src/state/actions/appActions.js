import { DECREMENT, INCREMENT } from "../constants/appConstants";


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
