import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as api from '../shared/api.jsx'
import { setRulesList } from './action.jsx';
import Switch from 'material-ui/Switch';
import ReactLoading from 'react-loading';

class RuleList extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            "updateOperation":false,
            "selection":{}
        }

    }
    componentDidMount() {
        this.setState({"updateOperation":true})
        api.getRules().then((rules) => {
            if (rules != null) {
                this.copySelectionToLocalState(rules)
                this.props.setRulesLocal(rules);
                this.setState({"updateOperation":false})
            }
        });
    }

    copySelectionToLocalState(rules)
    {
        const selectionLocalState ={};
        const rule = rules.map( (indexValue, i)=> {
            return selectionLocalState[i+1] = indexValue.enabled
        });
        this.setState({"selection":selectionLocalState});
    }
       updateEnumFromUI(ruleUpdateJson,stateNewCopy,ruleRowNum)
        {
            this.setState({"updateOperation":true})
            api.updateEnum(ruleUpdateJson).then((response) => {
                if (response != null) {
                    stateNewCopy.selection[ruleRowNum] = !this.state.selection[ruleRowNum]
                    this.setState({"selection":stateNewCopy.selection});
                    this.setState({"updateOperation":false})
                }
            });
        }

    handleChange(event,ruleRowNum,ruleUpdateJson) {
        const stateNewCopy ={...this.state}
        if(this.state.selection[ruleRowNum] == 0 || this.state.selection[ruleRowNum] == 1)
            {
                if(ruleUpdateJson.enabled ===0)
                    ruleUpdateJson.enabled = 1
                else
                    ruleUpdateJson.enabled = 0
                this.updateEnumFromUI([ruleUpdateJson],stateNewCopy,ruleRowNum)
            }
        else
           {
            stateNewCopy.selection[ruleRowNum] = true
            this.setState({"selection":stateNewCopy.selection});
           }
        
    }



    render() {
        const stateSelection = this.state.selection
        const ruleData = this.props.rules
       
        const rule = ruleData.map( (indexValue, i)=> {
            return (<tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{indexValue.raeId}</td>
                <td>{indexValue.actionText}</td>
                <td>{indexValue.description}</td>
                <td><a target="_blank" href={indexValue.playbookUrl}>GTS</a></td>
                <td><a href={indexValue.gbsUrl}>GBS</a></td>
                <td>
                    <div  >
                    <Switch
                          checked={stateSelection[i+1] == 1 ? true:false}
                        onChange={e => this.handleChange(e ,i+1,indexValue)}
                    />
                    </div>
                </td>
            </tr>)
        });


        return (
            <div>
            <div  style={this.state.updateOperation ? styles.showDivLoader : styles.hideDiv}>
            <ReactLoading type="spokes" color="#0277bd" />
            </div>
            <div style={this.state.updateOperation ?  styles.hideDiv:styles.showDiv}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">RULE_ID</th>
                            <th scope="col">Rule Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">PlayBook URL</th>
                            <th scope="col">GBS URL</th>
                            <th scope="col">Enable/Disable</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {rule}
                    </tbody>
                </table>
            </div>
            </div>
        );
    }
}


function mapStateToProps(ComponentState) {
    return { rules: ComponentState.ruleListReducer.rules };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setRulesLocal: setRulesList
    }, dispatch);
}


// prop validations
RuleList.propTypes = {
    setRulesLocal: PropTypes.func.isRequired
};

const styles = {
    showDivLoader:{
      display: 'block',
      marginTop:'300px'
    },
    showDiv:{
      display: 'block',
    },
    hideDiv:{
      display: 'none'
    },
    persons:{
      marginBottom:'-3%',
      marginRight:'2%',
      color:'#CCD45B'
    },
  }

export default connect(mapStateToProps, mapDispatchToProps)(RuleList);
