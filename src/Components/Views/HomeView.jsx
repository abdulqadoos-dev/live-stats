import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LOGOUT_PATH, TEAMS_PATH} from "../../state/constants/Constans";

export default function HomeView(){

    const navigate = useNavigate();

    useEffect(() => {
        navigate(TEAMS_PATH)
    },[])

    return(
        <>
            <h1>Home</h1>
            <button><Link to={LOGOUT_PATH}> -- LogOut -- </Link></button>
        </>
    )
}