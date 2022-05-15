import React from "react";
import {connect} from "react-redux"
import {setProfileForm} from "../../../state/actions/profileActions";
import GamesView from "../../Views/Games/GamesView";

const GameContainer = (props) => {
    return (
        <GamesView {...props}/>
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
        getGamesRequest: formData => dispatch(setProfileForm(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)