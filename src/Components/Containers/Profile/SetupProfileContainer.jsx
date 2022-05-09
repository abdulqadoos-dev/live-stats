import React from "react";
import {connect} from "react-redux"
import SetupProfileView from "../../Views/Profile/SetupProfileView";
import {setProfileForm} from "../../../state/actions/profileActions";

const SetupProfileContainer = (props) => {
    return (
        <SetupProfileView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetupProfileContainer)