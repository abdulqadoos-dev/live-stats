import React from "react";
import {connect} from "react-redux"
import AppView from "../Views/AppView";
import {decreaseCounter, increaseCounter} from "../../state/actions/app.actions";

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
        increaseCounter: () => dispatch(increaseCounter()),
        decreaseCounter: () => dispatch(decreaseCounter()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)