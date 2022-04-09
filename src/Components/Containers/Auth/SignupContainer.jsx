import React from "react";
import {connect} from "react-redux"

import SignupView from "../../Views/Auth/SignupView";

import {signupRequest} from "../../../state/actions/appActions";

const SignupContainer = (props) => {
    return (
        <SignupView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.app,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: formData => dispatch(signupRequest(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)