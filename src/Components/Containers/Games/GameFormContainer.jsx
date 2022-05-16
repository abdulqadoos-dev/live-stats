import React from "react";
import {connect} from "react-redux"
import {createGameRequest} from "../../../state/actions/gameActions";
import GameForm from "../../Views/Games/GameForm";

const GameFormContainer = (props) => {
    return (
        <GameForm {...props}/>
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
        createGamesRequest: (formData,navigation) => dispatch(createGameRequest(formData,navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFormContainer)