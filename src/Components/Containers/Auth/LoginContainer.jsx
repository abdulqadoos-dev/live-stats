import React from "react";
import {connect} from "react-redux"
import LoginView from "../../Views/Auth/LoginView";
import {loginRequest} from "../../../state/actions/authActions";
import {Link, useNavigate} from "react-router-dom";

const LoginContainer = (props) => {
    return (
        <LoginView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (formData,navigate) => dispatch(loginRequest(formData,navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)