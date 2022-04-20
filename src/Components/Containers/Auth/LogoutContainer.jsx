import React, {useEffect} from "react";
import {connect} from "react-redux"

import {logout} from "../../../state/actions/authActions";
import {useNavigate} from "react-router-dom";

const LogoutContainer = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        props.logout(navigate)
    }, [])
    return (
        <h1>Logout..</h1>
    )
}
const mapStateToProps = state => {
    return {
        ...state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (navigate) => dispatch(logout(navigate)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer)