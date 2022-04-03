import {DECREMENT, INCREMENT} from "../constants/app.constants";

const INITIAL_STATE = {
    todo: 0,
};

const app = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case INCREMENT:
            return {
                ...state, count: state.count + 1,
            };
        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };

        default: return state;

    }

};

export default app;