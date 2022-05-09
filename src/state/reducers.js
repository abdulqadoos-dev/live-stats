import {combineReducers} from 'redux';

import app from "./reducers/app";
import auth from "./reducers/auth";
import profile from "./reducers/profile";

const reducers = combineReducers({
    app,
    auth,
    profile
});

export default reducers;