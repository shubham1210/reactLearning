import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectionMade } from './action';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxDummy extends  Component{

    
  constructor(props, context) {
    super(props, context);
    this.state = {
        "checked":false
    }
    this.handleChange = this.handleChange.bind(this);
}
handleChange (event,checked) {
    debugger;
    console.log('handlechange');
    const name = `${this.props.aeNum}_${this.props.ruleNo}`;
    this.setState({"checked":checked})
    this.props.setSelectionMade({ [name]: checked });
  }

  componentWillReceiveProps(nextProps){
    console.log('checkbox willreceiveprops', nextProps, nextState)
  }

componentWillUnmount(){
    console.log('checkbox unmounted');
}
  
  render() {
    console.log('this.props.checkbox', this.props, this.state)
    return (
            <Checkbox
            checked={this.state.checked}
              onChange={this.handleChange}
            value={this.props.aeNum+"_"+this.props.ruleNo}
          />
    )
  }

  
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectionMade: setSelectionMade
    }, dispatch);
}

function mapStateToProps(ComponentState) {
    return { };
}

// prop validations
CheckboxDummy.propTypes = {
    setSelectionMade: PropTypes.func.isRequired,
    aeNum: PropTypes.number.isRequired,
    ruleNo: PropTypes.number.isRequired
};

export default connect( null,mapDispatchToProps)(CheckboxDummy);
