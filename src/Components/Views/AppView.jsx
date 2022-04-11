import React, {useEffect} from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";
import SignupContainer from "../Containers/Auth/SignupContainer";
import ForgetPasswordContainer from "../Containers/Auth/ForgetPasswordContainer";
import {BrowserRouter} from "react-router-dom";
import {Navigate, Routes, Route} from "react-router";
import {
    BASE_PATH,
    DASHBOARD_PATH,
    FORGET_PASSWORD_PATH,
    LOGIN_PATH,
    PAGE_NOT_FOUND,
    SIGNUP_PATH
} from "../../state/constants/Constans";


export default function AppView(props) {

    // console.log(props);


    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path={BASE_PATH}>
                        <Route index element={<h1>Home</h1>}/>
                        <Route path={LOGIN_PATH} element={<LoginContainer/>}/>
                        <Route path={SIGNUP_PATH} element={<SignupContainer/>}/>
                        <Route path={PAGE_NOT_FOUND} element={<h1>404 page not found</h1>}/>
                        <Route path={FORGET_PASSWORD_PATH} element={<ForgetPasswordContainer/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}
