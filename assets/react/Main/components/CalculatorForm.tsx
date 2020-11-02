import * as React from 'react';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AddSearch, Search, SearchStates } from '../types';
import { DATE_FORMAT } from "../constants";
import CalculatorResult from "./CalculatorResult";

type Props = {
    searches: Search[],
    searchStatus: SearchStates,
    addSearch: AddSearch
}

const CalculatorForm:React.ComponentType<Props> = (props:Props) => {

    const [search, setSearch] = React.useState({
        name: '',
        date: new Date()
    });

    const [isValid, setIsValid] = React.useState(true);

    return (
        <div className="panel panel-default">
            <div className="panel-heading">Calculate your ages</div>
            <div className="panel-body">
                <div className="row">
                    <form>
                        <div className="form-row">
                            <div className="col-sm-3">
                                <input type="text" className="form-control" placeholder="Name" onChange={event => {
                                    setSearch({...search, name: event.target.value})
                                }} />
                            </div>
                            <div className="col-sm-3">
                                <DatePicker
                                    selected={search.date}
                                    onChange={(date: Date) => {
                                        setSearch({...search, date: date})
                                    }}
                                    maxDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                />
                            </div>
                            <div className="col-sm-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (validateSearchName(search.name) && validateSearchDate(search.date)) {
                                            setIsValid(true);
                                            props.addSearch(calculateDateDiff(search.date, search.name));
                                        }
                                        else {
                                            setIsValid(false);
                                        }
                                    }}
                                >Calculate</button>
                            </div>
                        </div>
                    </form>
                </div>
                {!isValid && <div className="row"><div className=".text-danger">Wrong name or date</div></div>}
                {isValid && props.searchStatus === SearchStates.SUCCESS && <CalculatorResult searchResult={props.searches.pop()}/>}
            </div>
        </div>
    );
}

const validateSearchName = (name: string): boolean => {
    return name !== '';
}

const validateSearchDate = (date: Date): boolean => {

    const startDate = moment(date);
    const endDate = moment();

    const diff = Math.round(moment.duration(endDate.diff(startDate)).as('days'));

    return date != null && diff > 1;
}

const calculateDateDiff = (date: Date, name: string): Search => {
    const startDate = moment(date);
    const endDate = moment();

    const diff = moment.duration(endDate.diff(startDate));

    const years = Math.round(diff.as('years'));
    const days = Math.round(diff.as('days'));
    const hours = Math.round(diff.as('hours'));

    return {
        name: name,
        bDate: startDate.format(DATE_FORMAT),
        years: years,
        days: days,
        hours: hours
    };
}

export default CalculatorForm;