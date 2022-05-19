import React from "react";
import {connect} from "react-redux"
import {setProfileForm} from "../../../state/actions/profileActions";
import TeamsView from "../../Views/Teams/TeamsView";
import {getGamesRequest} from "../../../state/actions/gameActions";

const TeamsContainer = (props) => {
    return (
        <TeamsView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.profile,
        ...state.games
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTeamForm: formData => dispatch(setProfileForm(formData)),
        getGamesRequest: formData => dispatch(getGamesRequest(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsContainer)