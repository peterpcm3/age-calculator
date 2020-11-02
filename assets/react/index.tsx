import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { Provider } from 'react-redux';
import MainContainer from './Main/containers/MainContainer';
import store from "./Main/store/store";
import {SESSION_ID_STORAGE_KEY} from "./Main/constants";
import {fetchSearches} from "./Main/actions/action";

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('app-container');

    if ( ! mainContainer ) {
        return false;
    }

    if (sessionStorage.getItem(SESSION_ID_STORAGE_KEY) == null) {
        sessionStorage.setItem(SESSION_ID_STORAGE_KEY, uuidv4());
    }

    ReactDOM.render(
        <Provider store={store}>
            <MainContainer />
        </Provider>,
        mainContainer,
        () => {
            store.dispatch(fetchSearches(sessionStorage.getItem(SESSION_ID_STORAGE_KEY)));
        }
    );
})