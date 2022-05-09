import React from "react";
import {connect} from "react-redux"
import SelectSportView from "../../Views/Profile/SelectSportView";
import {createFanProfileRequest} from "../../../state/actions/profileActions";

const SelectSportContainer = (props) => {
    return (
        <SelectSportView {...props}/>
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
        createFanProfileRequest: (formData, navigate) => dispatch(createFanProfileRequest(formData, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectSportContainer)