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
        verificationRequest: (formData, navigate, activeView) => dispatch(verificationRequest(formData, navigate, activeView)),
        changePasswordRequest: (formData,navigate) => dispatch(changePasswordRequest(formData,navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)