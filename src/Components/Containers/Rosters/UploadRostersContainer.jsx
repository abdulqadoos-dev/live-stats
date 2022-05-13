import React from "react";
import {connect} from "react-redux"
import {createTeamProfileRequest, setProfileForm} from "../../../state/actions/profileActions";
import UploadRostersView from "../../Views/Rosters/UploadRostersView";

const UploadRosterContainer = (props) => {
    return (
        <UploadRostersView {...props}/>
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
        setProfileForm: (formData, navigate) => dispatch(setProfileForm(formData, navigate)),
        createTeamProfileRequest: (formData, navigate) => dispatch(createTeamProfileRequest(formData, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadRosterContainer)