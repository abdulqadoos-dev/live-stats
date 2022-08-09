import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FAN_ROLE_ID, FANS_PATH, LOCAL_STORAGE_AUTH_USER, LOGOUT_PATH, TEAMS_PATH} from "../../state/constants/Constans";

export default function HomeView(){

    const navigate = useNavigate();
    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    useEffect(() => {
        if(!user.roleId) return navigate(LOGOUT_PATH)
        return navigate(user.roleId === FAN_ROLE_ID ? FANS_PATH : TEAMS_PATH)
    },[])

    return(
        <>
            <h1>Home</h1>
            <button><Link to={LOGOUT_PATH}> -- LogOut -- </Link></button>
        </>
    )
}