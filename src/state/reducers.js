import {combineReducers} from 'redux';

import app from "./reducers/app";
import auth from "./reducers/auth";
import profile from "./reducers/profile";
import rosters from "./reducers/rosters";

const reducers = combineReducers({
    app,
    auth,
    profile,
    rosters
});

export default reducers;