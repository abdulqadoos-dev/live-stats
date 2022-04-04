import React from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";
import SignupContainer from "../Containers/Auth/SignupContainer";

export default function AppView(props) {
    console.log(props, "state");
    return (
        <main>
            {/*<LoginContainer/>*/}
            <SignupContainer/>
        </main>
    )
}