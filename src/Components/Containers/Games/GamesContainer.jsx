import React from "react";
import {connect} from "react-redux"
import GamesView from "../../Views/Games/GamesView";
import {getGamesRequest} from "../../../state/actions/gameActions";

const GameContainer = (props) => {
    return (
        <GamesView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.games
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getGamesRequest: formData => dispatch(getGamesRequest(formData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)