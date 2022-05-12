import {ReactSVG} from "react-svg";
import home from "../../Media/icons/home.svg";
import score from "../../Media/icons/score.svg";
import heart from "../../Media/icons/heart.svg";
import fan from "../../Media/icons/fan.svg";
import React from "react";


const Footer = () => {
    return (
        <div
            className="flex justify-around py-2 bg-secondary text-white text-sm  font-sans footer-navigation sticky bottom-0 w-full">
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
            <div>
                <ReactSVG src={fan}/>
                PROFILE
            </div>
        </div>
    )
}
export default Footer