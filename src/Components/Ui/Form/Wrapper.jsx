import React from "react";

export default function Wrapper({children}) {
    return (
        <>
            <div className="container mx-auto w-screen font-default mb-28">
                {children}
            </div>
        </>
    )
}