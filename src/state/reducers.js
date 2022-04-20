import {combineReducers} from 'redux';

import appReducers from "./reducers/app";
import authReducers from "./reducers/auth";

const reducers = combineReducers({
    app: appReducers,
    auth: authReducers,
});

export default reducers;