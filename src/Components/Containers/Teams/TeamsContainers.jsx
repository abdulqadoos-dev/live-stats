import React from "react";
import {connect} from "react-redux"
import {setProfileForm} from "../../../state/actions/profileActions";
import TeamsView from "../../Views/Teams/TeamsView";

const TeamsContainer = (props) => {
    return (
        <TeamsView {...props}/>
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
        setTeamForm: formData => dispatch(setProfileForm(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsContainer)