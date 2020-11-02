import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MainComponent from '../components/MainComponent';
import { MainReducerState } from "../reducers/MainReducer";
import { AddSearch, Search, SearchStates } from "../types";
import { addSearch } from "../actions/action";

export type MainContainerState = {
    searches: Search[],
    searchStatus: SearchStates
}

export type MainContainerDispatchProps = {
    addSearch: AddSearch
}

const mapStateToProps = (state: MainReducerState): MainContainerState => {
    return {
        searches: state.searches,
        searchStatus: state.searchStatus,
    }
}

// @ts-ignore
const mapDispatchToProps: MainContainerDispatchProps = (dispatch: Dispatch) => {
    return {
        addSearch: (search: Search) => {
            dispatch(addSearch(search));
        }
    };
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)( MainComponent );

export default MainContainer;
