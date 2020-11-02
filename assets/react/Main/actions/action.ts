import { Dispatch } from "redux";
import axios from 'axios';
import { Search } from "../types";
import { MainReducerState } from "../reducers/MainReducer";
import {
    STARTED_ADD_SEARCH_RESULT_ACTION,
    FINISHED_ADD_SEARCH_RESULT_ACTION,
    FAILED_ADD_SEARCH_RESULT_ACTION,
    SESSION_ID_STORAGE_KEY, FINISHED_FETCHING_SEARCHES_ACTION
} from "../constants";

export const addSearch = (search: Search): any => {
    return (dispatch: Dispatch<any>, getState: () => MainReducerState) => {

        dispatch({type: STARTED_ADD_SEARCH_RESULT_ACTION});

        axios.post('http://localhost/age-calculator/save', JSON.stringify({search: {...search, sessionId: sessionStorage.getItem(SESSION_ID_STORAGE_KEY)}}))
            .then( (response) => {

                if (response.data == null) {
                    throw 'Unexpected response';
                }

                return dispatch({type: FINISHED_ADD_SEARCH_RESULT_ACTION, search: search});
            })
            .catch( (error) => {
                return dispatch({type: FAILED_ADD_SEARCH_RESULT_ACTION});
            });
    }
}

export const fetchSearches = (sessionId: string): any => {
    return (dispatch: Dispatch<any>, getState: () => MainReducerState) => {

        axios.post('http://localhost/age-calculator/fetch', JSON.stringify({sessionId: sessionId}))
            .then( (response) => {

                if (response.data.searches == null) {
                    throw 'Unexpected response';
                }

                return dispatch({type: FINISHED_FETCHING_SEARCHES_ACTION, searches: response.data.searches});
            })
            .catch( (error) => {
                return false;
            });
    }
}