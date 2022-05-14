import {getRostersRequest, saveRostersRequest} from "../../../state/actions/rosterAction";
import {connect} from "react-redux";
import EditRosterView from "../../Views/Rosters/EditRosterView";


const RosterEditContainer = (props) => {
    return (
        <EditRosterView {...props}/>
    )
}

const mapStateToProps = state => {
    return {
        ...state.rosters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRostersRequest: (profileId,navigate) => dispatch(getRostersRequest(profileId,navigate)),
        saveRostersRequest: (profileId, rosters, navigate) => dispatch(saveRostersRequest(profileId, rosters, navigate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterEditContainer)