import React from "react";
import {connect} from "react-redux"
import GameBoardView from "../../Views/Games/GameBoardView";
import {createGameRequest} from "../../../state/actions/gameActions";

const GameBoardContainer = (props) => {
    return (
        <GameBoardView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer)