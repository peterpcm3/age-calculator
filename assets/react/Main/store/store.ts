import logger from "redux-logger";
import { applyMiddleware, compose, createStore } from "redux";
import { MainReducer } from "../reducers/MainReducer";
import reduxThunk from 'redux-thunk';
import { SearchStates } from "../types";

//activate redux browser extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appData      = (window as any).appData || null;
const appSearches  = appData != null ? appData.searches : [];

const storeInitialState = {
    searches: appSearches,
    searchStatus: SearchStates.NONE
}

const middlewares = [
    reduxThunk,
];

if (process.env.NODE_ENV === 'dev') {
    middlewares.push(logger);
}

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
);

export const store = createStore(
    MainReducer,
    storeInitialState,
    enhancer,
);

export default store;