import React from "react";
import Footer from "../Footer";

export default function Wrapper({children}) {
    return (
        <>
            <div className="container mx-auto h-screen w-screen font-default">
                {children}
            </div>
        </>
    )
}