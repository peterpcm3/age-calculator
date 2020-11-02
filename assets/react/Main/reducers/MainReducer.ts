import { Reducer } from "react";
import {Search, SearchStates} from "../types";
import {
    FAILED_ADD_SEARCH_RESULT_ACTION,
    FINISHED_ADD_SEARCH_RESULT_ACTION,
    FINISHED_FETCHING_SEARCHES_ACTION,
    STARTED_ADD_SEARCH_RESULT_ACTION
} from "../constants";

export type MainReducerState = {
    searches: Search[],
    searchStatus: SearchStates
}

const initialState: MainReducerState = {
    searches: [],
    searchStatus: SearchStates.NONE
}

export const MainReducer: Reducer<MainReducerState, any> = (state = initialState, action): MainReducerState => {

    switch (action.type) {
        case STARTED_ADD_SEARCH_RESULT_ACTION:
            return {
                ...state,
                searchStatus: SearchStates.PROGRESS
            }

        case FINISHED_ADD_SEARCH_RESULT_ACTION:
            return {
                ...state,
                searches: [...state.searches, action.search],
                searchStatus: SearchStates.SUCCESS
            }

        case FAILED_ADD_SEARCH_RESULT_ACTION:
            return {
                ...state,
                searchStatus: SearchStates.FAILED
            }

        case FINISHED_FETCHING_SEARCHES_ACTION:
            return {
                ...state,
                searches: [...state.searches, ...action.searches],
            }

        default:
            return state;
    }

    return state;
}