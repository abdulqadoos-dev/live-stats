import React from "react";
import {connect} from "react-redux"
import AppView from "../Views/AppView";
import {testAction} from "../../state/actions/appActions";

const AppContainer = (props) => {
    return (
        <AppView {...props}/>
    )
}
const mapStateToProps = state => {
    return {
        ...state,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        testAction : () => dispatch(testAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)