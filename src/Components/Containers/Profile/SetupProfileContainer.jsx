import React from "react";
import {connect} from "react-redux"
import {loginRequest} from "../../../state/actions/authActions";
import SetupProfileView from "../../Views/Profile/SetupProfileView";

const SetupProfileContainer = (props) => {
    return (
        <SetupProfileView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (formData, navigate) => dispatch(loginRequest(formData, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupProfileContainer)