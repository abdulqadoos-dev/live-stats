import React from "react";

export default function ProfileSetupWrapper({children}) {
    return (
        <>
            <div className="bg-zinc-800 h-screen w-screen flex items-center justify-center">
                {children}
            </div>
        </>
    )
}