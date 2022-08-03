import React from "react";
import {connect} from "react-redux"
import {changeMatchState, getMatchRequest, updateMatchRequest} from "../../../state/actions/matchActions";
import FansView from "../../Views/Fans/FansView";

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
        getMatchRequest: (id, navigation) => dispatch(getMatchRequest(id, navigation)),
        updateMatchRequest: (formData, navigation) => dispatch(updateMatchRequest(formData, navigation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FansContainer)