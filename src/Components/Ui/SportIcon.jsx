import React from "react";
import {ReactSVG} from "react-svg";

export default function SportIcon({src, className, isActive = null}) {
    return (
        <div
            className={` ${isActive ? "bg-primary" : "bg-white"} hover:bg-primary cursor-pointer rounded-full p-2 lg:p-4 text-center select-sport-svg ${className}`}>
            <ReactSVG src={src}/>
        </div>
    )
}