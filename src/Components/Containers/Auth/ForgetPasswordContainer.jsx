import React from "react";
import { connect } from "react-redux"

import { forgetPasswordRequest, verificationRequest, changePasswordRequest } from "../../../state/actions/authActions";
import ForgetPasswordView from "../../Views/Auth/ForgetPasswordView";

const ForgetPasswordContainer = (props) => {
    return (
        <ForgetPasswordView {...props} />
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forgetPasswordRequest: (formData) => dispatch(forgetPasswordRequest(formData)),
        verificationRequest: (formData, activeView) => dispatch(verificationRequest(formData, activeView)),
        changePasswordRequest: (formData) => dispatch(changePasswordRequest(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)