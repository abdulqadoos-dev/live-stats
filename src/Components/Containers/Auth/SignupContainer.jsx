import React from "react";
import {connect} from "react-redux"
import {increaseCounter} from "../../../state/actions/app.actions";
import SignupView from "../../Views/Auth/SignupView";

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
        increaseCounter: () => dispatch(increaseCounter()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer)