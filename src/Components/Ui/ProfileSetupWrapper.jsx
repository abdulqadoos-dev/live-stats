import React from "react";

export default function ProfileSetupWrapper({children,className}) {
    return (
        <>
            <div className={`bg-secondary h-screen w-screen font-default grid content-center justify-items-center ${className}`}>
                {children}
            </div>
        </>
    )
}