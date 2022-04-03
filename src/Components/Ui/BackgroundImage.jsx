import React from "react";

export default function BackgroundImage(props) {
    const background = {
        background: `linear-gradient(rgba(0,184,255, 0.3), rgba(14,99,255, 0.6)) , url(${props.backgroundImage}) no-repeat top center`,
    }
    return (
        <div style={background}
             className={`${props.backgroundImage ? 'bg-gradient-to-t from-blue-500 to-cyan-500' : ''}`}>
            {props.children}
        </div>
    )
}