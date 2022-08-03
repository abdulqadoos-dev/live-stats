import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LOGOUT_PATH, TEAMS_PATH} from "../../state/constants/Constans";
import io from "socket.io-client";

export default function HomeView(){

    const navigate = useNavigate();
    const socket = io.connect('http://127.0.0.1:5000');

    useEffect(() => {
        socket.emit('request_game_data', {gameId:1})
        socket.on("get_game_data", data => {
            console.log('data',data);
        });
        // CLEAN UP THE EFFECT
        // return () => {socket.disconnect()};
    }, []);

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