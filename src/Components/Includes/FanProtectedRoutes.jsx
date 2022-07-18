import React from "react";
import {Navigate} from "react-router";
import {LOGIN_PATH} from "../../state/constants/Constans";
import {FAN_ROLE_ID} from "../../state/constants/Constans"

const FanProtectedRoutes = ({isLoggedIn, children, user}) => {
    return isLoggedIn ? (user.roleId == FAN_ROLE_ID ? children : <Navigate to={LOGIN_PATH}/>) : <Navigate to={LOGIN_PATH}/>
}
export default FanProtectedRoutes;