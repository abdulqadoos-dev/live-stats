import {ReactSVG} from "react-svg";
import home from "../../Media/icons/home.svg";
import score from "../../Media/icons/score.svg";
import heart from "../../Media/icons/heart.svg";
import fan from "../../Media/icons/fan.svg";
import React from "react";
import {BASE_PATH, LOGOUT_PATH} from "../../state/constants/Constans";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
    <>
        <div className="fixed bottom-0 w-full">
        <div
            className="flex justify-around py-2 bg-secondary text-white text-xs lg:text-sm font-sans footer-navigation ">
            <Link to={BASE_PATH}>
                <ReactSVG src={home}/>
                MY TEAM
            </Link>
            <div>
                <ReactSVG src={score}/>
                SCORES
            </div>
            <div>
                <ReactSVG src={heart}/>
                FAVORITES
            </div>
            <Link to={LOGOUT_PATH}>
                    <ReactSVG src={fan}/>
                    LOGOUT
            </Link>
        </div>
        </div></>

    )
}
export default Footer