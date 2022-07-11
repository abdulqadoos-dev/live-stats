import React from "react";
import {connect} from "react-redux"
import GameBoardView from "../../Views/Games/GameBoardView";
import {changeMatchState, getMatchRequest, updateMatchRequest} from "../../../state/actions/matchActions";

const GameBoardContainer = (props) => {
    return (
        <GameBoardView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.games,
        ...state.matches
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeMatchState: (key,value) => dispatch(changeMatchState(key,value)),
        getMatchRequest: (formData,navigation) => dispatch(getMatchRequest(formData,navigation)),
        updateMatchRequest: (formData,navigation) => dispatch(updateMatchRequest(formData,navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer)