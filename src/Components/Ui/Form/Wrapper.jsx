import React from "react";

export default function Wrapper({children, readyOnly = false}) {
    return (
        <>
            {readyOnly && (<div className="w-full h-full bg-white opacity-30 z-10 absolute "/>)}
            <div className="container mx-auto w-screen font-default mb-28 ">
                {children}
            </div>
        </>
    )
}