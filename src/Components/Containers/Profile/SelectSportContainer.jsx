import React from "react";
import {connect} from "react-redux"
import {loginRequest} from "../../../state/actions/authActions";
import SelectSportView from "../../Views/Profile/SelectSportView";

const SelectSportContainer = (props) => {
    return (
        <SelectSportView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectSportContainer)