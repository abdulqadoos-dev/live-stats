import React from "react";
import {connect} from "react-redux"
import {loginRequest} from "../../../state/actions/authActions";
import LocationDetailsView from "../../Views/Profile/LocationDetailsView";

const LocationDetailsContainer = (props) => {
    return (
        <LocationDetailsView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetailsContainer)