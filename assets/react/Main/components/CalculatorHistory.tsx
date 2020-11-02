import * as React from 'react';
import { Search } from "../types";

type Props = {
    searches: Search[]
}

const CalculatorHistory:React.ComponentType<Props> = (props:Props) => {

    return (
        <div className="panel panel-default">
            <div className="panel-heading">Recent searched dates</div>
            <div className="panel-body">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">Name</div>
                        <div className="col-sm-2">Birth Date</div>
                        <div className="col-sm-2">Years</div>
                        <div className="col-sm-2">Days</div>
                        <div className="col-sm-2">Hours</div>
                    </div>
                    {props.searches.map((search: Search, searchKey: number) => {
                        return (
                            <div className="row" key={searchKey}>
                                <div className="col-sm-2">{search.name}</div>
                                <div className="col-sm-2">{search.bDate}</div>
                                <div className="col-sm-2">{search.years}</div>
                                <div className="col-sm-2">{search.days}</div>
                                <div className="col-sm-2">{search.hours}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CalculatorHistory;