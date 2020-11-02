import * as React from 'react';
import * as moment from 'moment';
import { Search } from "../types";

type Props = {
    searchResult: Search
}

const CalculatorResult:React.ComponentType<Props> = (props:Props) => {

    return (
        <div className="container">
            <div className="row"></div>
            <div className="row">{`How old are you? You are born ${props.searchResult.bDate}`}</div>
            <div className="row">
                <div className="col-sm-2">Years</div>
                <div className="col-sm-2">{props.searchResult.years}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">Days</div>
                <div className="col-sm-2">{props.searchResult.days}</div>
            </div>
            <div className="row">
                <div className="col-sm-2">Hours</div>
                <div className="col-sm-2">{props.searchResult.hours}</div>
            </div>
        </div>
    );
}

export default CalculatorResult;