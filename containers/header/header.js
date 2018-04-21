import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setUserDetails} from './action';

class Header extends Component {

    componentDidMount(){
        console.log('In creating.....');
        this.props.setUserDetails();
    }

    render () {
        return <p>Recoactions Project Header</p>
    }
}

function mapStateToProps(ComponentState)
{
        return {userName :'Shubham Sharma'};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setUserDetails: setUserDetails
    }, dispatch);
  }




  export default connect(null, mapDispatchToProps)(Header);
