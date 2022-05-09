import React from "react";
import {connect} from "react-redux"
import LocationDetailsView from "../../Views/Profile/LocationDetailsView";
import {setProfileForm} from "../../../state/actions/profileActions";

const LocationDetailsContainer = (props) => {
    return (
        <LocationDetailsView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfileForm: formData => dispatch(setProfileForm(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetailsContainer)