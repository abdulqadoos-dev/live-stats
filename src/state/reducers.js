import {combineReducers} from 'redux';

import appReducers from "./reducers/app.reducers";

const reducers = combineReducers({
    app: appReducers,
});

export default reducers;