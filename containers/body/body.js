import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as api from '../shared/api'
import { setRulesList } from './action';
import { Button,ButtonToolbar } from 'react-bootstrap';


class Body extends Component {

    componentDidMount() {
        api.getRules().then((rules) => {
            if (rules != null) {
                this.props.setRulesLocal(rules);
            }
        });
    }

    render() {

        const rule = this.props.rules.map(function (indexValue, i) {
            return (<tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{indexValue.title}</td>
                <td>{indexValue.releaseYear}</td>
                <td>Yes</td>
                <td></td>
            </tr>)
        });
        console.log(rule);

        return (

            <div>
                <ButtonToolbar>
                    {/* Standard button */}
                    <Button>Default</Button>

                    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
                    <Button bsStyle="primary">Primary</Button>

                    {/* Indicates a successful or positive action */}
                    <Button bsStyle="success">Success</Button>

                    {/* Contextual button for informational alert messages */}
                    <Button bsStyle="info">Info</Button>

                    {/* Indicates caution should be taken with this action */}
                    <Button bsStyle="warning">Warning</Button>

                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger">Danger</Button>

                    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
                    <Button bsStyle="link">Link</Button>
                </ButtonToolbar>;
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
