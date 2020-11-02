import * as React from 'react';
import { MainContainerState, MainContainerDispatchProps } from "../containers/MainContainer";
import CalculatorForm from "./CalculatorForm";
import CalculatorHistory from "./CalculatorHistory";

type Props = MainContainerState & MainContainerDispatchProps;

export default class MainComponent extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                <CalculatorForm
                    searches={this.props.searches}
                    addSearch={this.props.addSearch}
                    searchStatus={this.props.searchStatus}
                />
                {this.props.searches && <CalculatorHistory searches={this.props.searches} />}
            </>
        );
    }
}
