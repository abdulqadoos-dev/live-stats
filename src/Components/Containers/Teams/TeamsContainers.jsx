import React from "react";
import {connect} from "react-redux"
import TeamsView from "../../Views/Teams/TeamsView";
import {setProfileForm} from "../../../state/actions/profileActions";
import {changeGameState, getGamesRequest} from "../../../state/actions/gameActions";
import {getRostersRequest} from "../../../state/actions/rosterAction";

const TeamsContainer = (props) => {
    return (
        <TeamsView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.profile,
        ...state.games,
        ...state.rosters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTeamForm: formData => dispatch(setProfileForm(formData)),
        getGamesRequest: formData => dispatch(getGamesRequest(formData)),
        changeGameSate : (key,value) => dispatch(changeGameState(key,value)),
        getRostersRequest: (profileId, navigate) => dispatch(getRostersRequest(profileId, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsContainer)