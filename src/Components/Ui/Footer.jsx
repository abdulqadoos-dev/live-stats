import {ReactSVG} from "react-svg";
import home from "../../Media/icons/home.svg";
import score from "../../Media/icons/score.svg";
import heart from "../../Media/icons/heart.svg";
import fan from "../../Media/icons/fan.svg";
import React from "react";
import {LOGOUT_PATH} from "../../state/constants/Constans";
import {Link} from "react-router-dom";


const Footer = () => {
    return (
    <>
        <div className="pt-28"/>
        <div className="fixed bottom-0 w-full">
        <div
            className="flex justify-around py-2 bg-secondary text-white text-xs lg:text-sm font-sans footer-navigation ">
            <div>
                <ReactSVG src={home}/>
                MY TEAM
            </div>
            <div>
                <ReactSVG src={score}/>
                SCORES
            </div>
            <div>
                <ReactSVG src={heart}/>
                FAVORITES
            </div>
            <div className="cursor-pointer">
                <Link to={LOGOUT_PATH}>
                    <ReactSVG src={fan}/>
                    LOGOUT
                </Link>
            </div>
        </div>
        </div></>

    )
}
export default Footer