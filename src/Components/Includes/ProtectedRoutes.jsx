import React from "react";
import {Navigate} from "react-router";
import {LOGIN_PATH} from "../../state/constants/Constans";

const ProtectedRoutes = ({isLoggedIn, children}) => {
    return isLoggedIn ? children : <Navigate to={LOGIN_PATH}/>
}
export default ProtectedRoutes;