import React from "react";
import {connect} from "react-redux"
import {testAction} from "../../state/actions/appActions";
import HomeView from "../Views/HomeView";

const HomeContainer = (props) => {
    return (
        <HomeView {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)