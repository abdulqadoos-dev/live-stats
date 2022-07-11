import {combineReducers} from 'redux';

import app from "./reducers/app";
import auth from "./reducers/auth";
import profile from "./reducers/profile";
import rosters from "./reducers/rosters";
import games from "./reducers/games";
import matches from "./reducers/matches";

const reducers = combineReducers({
    app,
    auth,
    profile,
    rosters,
    games,
    matches
});

export default reducers;