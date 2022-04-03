import React from "react";
import {connect} from "react-redux"
import LoginView from "../../Views/Auth/LoginView";
import {increaseCounter} from "../../../state/actions/app.actions";

const LoginContainer = (props) => {
    return (
        <LoginView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)