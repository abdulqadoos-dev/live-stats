import React from "react";
import {connect} from "react-redux"
import GameBoardView from "../../Views/Games/GameBoardView";
import {changeMatchState, getMatchRequest, updateMatchRequest} from "../../../state/actions/matchActions";
import io from "socket.io-client";

const GameBoardContainer = (props) => {
    React.useEffect(()=>{
        const socket = io.connect(process.env.REACT_APP_SERVER_PATH);
        // CLEAN UP THE EFFECT
        return () => socket.disconnect();
        //
    },[])
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
        changeMatchState: (key, value) => dispatch(changeMatchState(key, value)),
        getMatchRequest: (id, navigation) => dispatch(getMatchRequest(id, navigation)),
        updateMatchRequest: (formData, navigation) => dispatch(updateMatchRequest(formData, navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoardContainer)