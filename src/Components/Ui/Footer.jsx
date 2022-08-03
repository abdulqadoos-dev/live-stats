import {ReactSVG} from "react-svg";
import home from "../../Media/icons/home.svg";
import score from "../../Media/icons/score.svg";
import heart from "../../Media/icons/heart.svg";
import fan from "../../Media/icons/fan.svg";
import React from "react";
import {
    BASE_PATH,
    FAN_ROLE_ID,
    FANS_PATH,
    GAMES_BOARD_PATH,
    LOCAL_STORAGE_AUTH_USER,
    LOGOUT_PATH
} from "../../state/constants/Constans";
import {Link} from "react-router-dom";


const Footer = () => {

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    return (
        <>
            <div className="fixed bottom-0 w-full z-20">
                <div
                    className="flex justify-around py-2 bg-secondary text-white text-xs lg:text-sm font-sans footer-navigation ">
                    <Link to={BASE_PATH}>
                        <ReactSVG src={home}/>
                        MY TEAM
                    </Link>
                    <Link to={user.roleId === FAN_ROLE_ID ? FANS_PATH : GAMES_BOARD_PATH}>
                        <ReactSVG src={score}/>
                        SCORES
                    </Link>
                    <div>
                        <ReactSVG src={heart}/>
                        FAVORITES
                    </div>
                    <Link to={LOGOUT_PATH}>
                        <ReactSVG src={fan}/>
                        LOGOUT
                    </Link>
                </div>
            </div>
        </>

    )
}
export default Footer