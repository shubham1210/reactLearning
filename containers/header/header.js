import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserDetails } from './action';

class Header extends Component {

    componentDidMount() {
        this.props.setHeaderDetails('Nikhil sharma');
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="row container-fluid">
                        <div className="col col-xs-2 col-md-2 logocontainer">
                            <img src="/assets/containers/img/logo-white.png" alt="gartner logo-white" />
                        </div>
                        <div className="col col-xs-8 col-md-8 headertitle">{'Recoations Admin Page'}</div>
                        <div className="col col-xs-2 col-md-2 userinfocontainer">
                            <img src="/assets/containers/img/login-img.png" alt="login icon" />{this.props.userName}
                        </div>
                    </div>
                </div>
            </nav>);
    }
}

function mapStateToProps(ComponentState) {
    return { userName: ComponentState.headerReducer.userName };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setHeaderDetails: setUserDetails
    }, dispatch);
}


// prop validations
Header.propTypes = {
    setHeaderDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
