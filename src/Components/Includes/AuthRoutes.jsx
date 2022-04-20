import React from "react";
import {Navigate} from "react-router";
import {BASE_PATH} from "../../state/constants/Constans";

const AuthRoutes = ({isLoggedIn, children}) => {
    return isLoggedIn ? <Navigate to={BASE_PATH}/> : children
}
export default AuthRoutes;