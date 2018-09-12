import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserDetails } from "./action.jsx";
import * as api from "../shared/api.jsx";

class Header extends Component {
    constructor(props, context) {
        console.log("constructor start")
        super(props, context);
    }

    componentDidMount() {
        console.log("componentDidMount start")
        api.getLoggedUser().then(user => {
            if (user != null) {
                this.props.setHeaderDetails(user.usrFirstNm + " " + user.usrLstNm);
            }
        });
        console.log("componentDidMount end")

    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container-fluid">
                        <div className="row container-fluid">
                            <div className="col col-xs-2 col-md-2 logocontainer">
                                <img
                                    src="/assets/containers/img/logo-white.png"
                                    alt="gartner logo-white"
                                />
                            </div>
                            <div className="col col-xs-8 col-md-8 headertitle">
                                {"Recoations Admin Page"}
                            </div>
                            <div className="col col-xs-2 col-md-2 userinfocontainer">
                                <img
                                    src="/assets/containers/img/login-img.png"
                                    alt="login icon"
                                />
                                &nbsp;
                {this.props.userName}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(ComponentState) {
    console.log("in map state to props",ComponentState.headerReducer.userName)
    return { userName: ComponentState.headerReducer.userName };
}

function mapDispatchToProps(dispatch) {
    console.log("in mapDispatchToProps")
    return bindActionCreators({ setHeaderDetails: setUserDetails }, dispatch);
}

// prop validations
Header.propTypes = {
    setHeaderDetails: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
