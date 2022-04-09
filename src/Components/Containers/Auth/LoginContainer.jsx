import React from "react";
import {connect} from "react-redux"
import LoginView from "../../Views/Auth/LoginView";

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
        test : console.log('test')
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)