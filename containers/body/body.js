import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as api from '../shared/api'
import { setRulesList } from './action';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Switch from 'material-ui/Switch';
import { FormGroup, FormControlLabel } from 'material-ui/Form';


class Body extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            "selection": {
            }

        }

    }
    componentDidMount() {
        api.getRules().then((rules) => {
            if (rules != null) {
                this.props.setRulesLocal(rules);
            }
        });
    }

    handleChange(event,name) {
        const stateNewCopy ={...this.state}
        if(this.state.selection[name] == 0 || this.state.selection[name] == 1)
            stateNewCopy.selection[name] = !this.state.selection[name]
        else
            stateNewCopy.selection[name] = true
        this.setState({stateNewCopy});
    }



    render() {
        const stateSelection = this.state.selection
        const ruleData = this.props.rules
        const rule = ruleData.map( (indexValue, i)=> {
            return (<tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{indexValue.title}</td>
                <td>{indexValue.releaseYear}</td>
                <td>Yes</td>
                <td>
                    <Switch
                        checked={stateSelection[i]}
                        onChange={e => this.handleChange(event ,i)}
                    />
                </td>
            </tr>)
        });

        return (

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Rule Name</th>
                            <th scope="col">Rule ID</th>
                            <th scope="col">Active Flag</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rule}
                    </tbody>
                </table>
            </div>
        );
    }
}


function mapStateToProps(ComponentState) {
    console.log(ComponentState.bodyReducer.rules);
    return { rules: ComponentState.bodyReducer.rules };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setRulesLocal: setRulesList
    }, dispatch);
}


// prop validations
Body.propTypes = {
    setRulesLocal: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
