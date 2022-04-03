import React from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";

export default function AppView(props) {
    console.log(props, "state");
    return (
        <main>
            <LoginContainer/>
        </main>
    )
}