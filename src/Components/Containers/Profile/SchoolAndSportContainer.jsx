import React from "react";
import {connect} from "react-redux"

import {setProfileForm} from "../../../state/actions/profileActions";
import SchoolAndSportView from "../../Views/Profile/SchoolAndSportView";

const SchoolAndSportContainer = (props) => {
    return (
        <SchoolAndSportView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
        ...state.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setProfileForm: (formData, navigate) => dispatch(setProfileForm(formData, navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolAndSportContainer)