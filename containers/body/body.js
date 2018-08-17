import React, { Component } from 'react';
import { connect } from 'react-redux';
import RuleList from '../rulesList/ruleList'
import RecoAction from '../recoAction/recoAction'
import OnOffAction from '../onOffAction/onOffAction'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Body extends Component {

    constructor(props, context) {
        super(props, context);
        this.switchAPI = this.switchAPI.bind(this);
        this.state = {
            "tabSelection":0
        }
    }
    componentDidMount() {
    }
    switchAPI =(event, value)=> {
       this.setState({
           tabSelection: value
       })
        
    }


    render() {
        const { tabSelection } = this.state;
        const ruleList =  <RuleList/>
        const recoAction = <RecoAction/>
        const onOffAction = <OnOffAction/>
        console.log(tabSelection);
        return (
        <div>
            <AppBar position="static">
                <Tabs value={tabSelection} onChange={this.switchAPI}>
                    <Tab label="Rules Listing" />
                    <Tab label="Actions" />
                    <Tab label="On/Off Actions" />
                </Tabs>
            </AppBar>
            {tabSelection === 0 && ruleList}
            {tabSelection === 1 && recoAction}
            {tabSelection === 2 && onOffAction}
        </div>
        );
    }
}


function mapStateToProps(ComponentState) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}


// prop validations
Body.propTypes = {
};


export default connect(mapStateToProps, mapDispatchToProps)(Body);
