import React from "react";
import {connect} from "react-redux"
import {setProfileForm} from "../../../state/actions/profileActions";
import RosterView from "../../Views/Rosters/RosterView";

const UploadRosterContainer = (props) => {
    return (
        <RosterView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadRosterContainer)