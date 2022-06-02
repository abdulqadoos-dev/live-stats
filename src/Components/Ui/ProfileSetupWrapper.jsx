import React from "react";

export default function ProfileSetupWrapper({children,className}) {
    return (
        <>
            <div className={`bg-secondary min-h-screen h-100 w-screen font-default grid content-center justify-items-center py-10 ${className}`}>
                {children}
            </div>
        </>
    )
}