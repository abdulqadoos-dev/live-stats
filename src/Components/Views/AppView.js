import React from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";

export default function AppView(props) {
    console.log(props, "state");
    return (
        <main className="container mx-auto bg-gray-50 h-screen">
            <LoginContainer/>
        </main>
    )
}