import React from "react";
import {connect} from "react-redux"
import RosterView from "../../Views/Rosters/RosterView";
import {getRostersRequest} from "../../../state/actions/rosterAction";

const UploadRosterContainer = (props) => {
    return (
        <RosterView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.rosters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRostersRequest: (profileId, navigate) => dispatch(getRostersRequest(profileId, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadRosterContainer)