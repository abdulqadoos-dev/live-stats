import React from "react";
import {connect} from "react-redux"
import StartGame from "../../Views/Games/StartGame";
import {setProfileForm} from "../../../state/actions/profileActions";
import {getRostersRequest} from "../../../state/actions/rosterAction";
import {changeGameState, getGamesRequest} from "../../../state/actions/gameActions";

const StartGameContainer = (props) => {
    return (
        <StartGame {...props}/>
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
        changeGameSate: (key, value) => dispatch(changeGameState(key, value)),
        getRostersRequest: (profileId, navigate) => dispatch(getRostersRequest(profileId, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartGameContainer)