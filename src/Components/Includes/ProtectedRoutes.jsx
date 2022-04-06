import React from "react";
import {LOGIN_PATH} from "../../Services/Constans";
import {Outlet, Navigate} from "react-router";


const isAuthenticated = () => {
    const user = {loggedIn: false}
    return user.loggedIn;
}


const ProtectedRoutes = () => {
    return isAuthenticated() ?  <Outlet/> : <Navigate to={LOGIN_PATH}/>
}
export default ProtectedRoutes;