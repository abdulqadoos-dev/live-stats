import React from "react";

export default function ProfileSetupWrapper({children}) {
    return (
        <>
            <div className="bg-secondary h-screen w-screen font-default grid content-center justify-items-center">
                {children}
            </div>
        </>
    )
}