import React, {useEffect} from "react"
import LoginContainer from "../Containers/Auth/LoginContainer";
import SignupContainer from "../Containers/Auth/SignupContainer";
import ForgetPasswordContainer from "../Containers/Auth/ForgetPasswordContainer";
import {BrowserRouter, Link} from "react-router-dom";
import {Routes, Route} from "react-router";
import {
    BASE_PATH,
    SIGNUP_PATH,
    PAGE_NOT_FOUND,
    SETUP_PROFILE_PATH,
    FORGET_PASSWORD_PATH,
    LOCAL_STORAGE_AUTH_USER,
    LOGIN_PATH, LOGOUT_PATH
} from "../../state/constants/Constans";
import ProtectedRoutes from "../Includes/ProtectedRoutes";
import AuthRoutes from "../Includes/AuthRoutes";
import LogoutContainer from "../Containers/Auth/LogoutContainer";
import SetupProfileContainer from "../Containers/Profile/SetupProfileContainer";


export default function AppView(props) {

    // console.log({isLoggedIn}, props.auth, "AUTH STATE");
    const authUser = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const isLoggedIn = !!authUser?.user;

    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path={BASE_PATH}>

                        <Route index element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <h1>Home</h1>
                                <Link to={LOGOUT_PATH}> -- Login Out -- </Link>
                            </ProtectedRoutes>
                        }/>

                        <Route path={SETUP_PROFILE_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                               <SetupProfileContainer/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={LOGIN_PATH} element={
                            <AuthRoutes isLoggedIn={isLoggedIn}>
                                <LoginContainer/>
                            </AuthRoutes>
                        }/>

                        <Route path={SIGNUP_PATH} element={
                            <AuthRoutes isLoggedIn={isLoggedIn}>
                                <SignupContainer/>
                            </AuthRoutes>
                        }/>

                        <Route path={FORGET_PASSWORD_PATH} element={
                            <AuthRoutes isLoggedIn={isLoggedIn}>
                                <ForgetPasswordContainer/>
                            </AuthRoutes>
                        }/>

                        <Route path={PAGE_NOT_FOUND} element={
                            <h1>404 page not found <Link to={BASE_PATH}> -- Home --</Link></h1>
                        }/>

                        <Route path={LOGOUT_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <LogoutContainer/>
                            </ProtectedRoutes>
                        }/>

                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    )
}
