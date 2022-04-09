import React from "react";
import {connect} from "react-redux"

import {testAction} from "../../../state/actions/appActions";
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
        testAction : () => dispatch(testAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)