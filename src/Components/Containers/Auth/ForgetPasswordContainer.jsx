import React from "react";
import {connect} from "react-redux"
import {increaseCounter} from "../../../state/actions/app.actions";
import ForgetPasswordView from "../../Views/Auth/ForgetPasswordView";

const ForgetPasswordContainer = (props) => {
    return (
        <ForgetPasswordView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)