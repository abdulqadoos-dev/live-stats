import React from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";
import SignupContainer from "../Containers/Auth/SignupContainer";
import ForgetPasswordContainer from "../Containers/Auth/ForgetPasswordContainer";

export default function AppView(props) {
    console.log(props, "state");
    return (
        <main>
            <SignupContainer/>
            <LoginContainer/>
            <ForgetPasswordContainer/>
        </main>
    )
}