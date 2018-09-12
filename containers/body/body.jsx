import React, { Component } from "react";
import RuleList from "../uniqueRulesList/ruleList.jsx";
import RecoAction from "../aeDetails/aeDetails.jsx";
import OnOffAction from "../onOffAction/onOffAction.jsx";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TableForOnOffAction from "../onOffActionsForAe/tableForOnOffAction.jsx"


class Body extends Component {
    constructor(props, context) {
        super(props, context);
        this.switchAPI = this.switchAPI.bind(this);
        this.state = {
            tabSelection: 3
        };
    }

    switchAPI = (event, value) => {
        this.setState({
            tabSelection: value
        });
    };

    render() {
        const { tabSelection } = this.state;
        const ruleList = <RuleList />;
        const recoAction = <RecoAction />;
        const onOffAction = <OnOffAction />;
        const onOffActionUpdated = <TableForOnOffAction />;
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={tabSelection} onChange={this.switchAPI}>
                        <Tab label="Unique Rules    " />
                        <Tab label="Active AE Listing" />
                        <Tab label="On/Off Actions" />
                        <Tab label="On/Off Actions updated" />
                    </Tabs>
                </AppBar>
                {tabSelection === 0 && ruleList}
                {tabSelection === 1 && recoAction}
                {tabSelection === 2 && onOffAction}
                {tabSelection === 3 && onOffActionUpdated}
            </div>
        );
    }
}

export default Body;
