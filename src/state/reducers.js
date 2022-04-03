import {combineReducers} from 'redux';

import appReducers from "./reducers/app.reducers";

const reducers = combineReducers({
    counter: appReducers,
});

export default reducers;