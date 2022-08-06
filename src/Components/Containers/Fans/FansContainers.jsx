import React from "react";
import {connect} from "react-redux"
import {changeMatchState, updateMatchRequest} from "../../../state/actions/matchActions";
import FansView from "../../Views/Fans/FansView";
import {changeGameState, getGamesRequest} from "../../../state/actions/gameActions";

const FansContainer = (props) => {
    return (
        <FansView {...props}/>
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
        changeMatchState: (key, value) => dispatch(changeMatchState(key, value)),
        getGamesRequest: formData => dispatch(getGamesRequest(formData)),
        changeGameSate : (key,value) => dispatch(changeGameState(key,value)),
        updateMatchRequest: (formData, navigation) => dispatch(updateMatchRequest(formData, navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FansContainer)