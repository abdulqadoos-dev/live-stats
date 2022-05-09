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
    LOGIN_PATH,
    LOGOUT_PATH,
    BUILD_YOUR_PROFILE_PATH,
    LOCATION_DETAILS_PATH,
    SELECT_SPORT_PATH,
    CREATING_FEED_PATH,
    SCHOOL_AND_SPORT_PATH
} from "../../state/constants/Constans";
import ProtectedRoutes from "../Includes/ProtectedRoutes";
import AuthRoutes from "../Includes/AuthRoutes";
import LogoutContainer from "../Containers/Auth/LogoutContainer";
import SetupProfileContainer from "../Containers/Profile/SetupProfileContainer";
import BuildProfileView from "./Profile/BuildProfileView";
import LocationDetailsContainer from "../Containers/Profile/LocationDetailsContainer";
import SelectSportContainer from "../Containers/Profile/SelectSportContainer";
import CreatingFeedView from "./Profile/CreatingFeedView";
import SchoolAndSportContainer from "../Containers/Profile/SchoolAndSportContainer";


export default function AppView(props) {

    // console.log({isLoggedIn}, props.auth, "AUTH STATE");
    console.info(props, "STATE");
    // console.info(localStorage.getItem(LOCAL_STORAGE_AUTH_USER), "Local Storage Object..");

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
                                <Link to={LOGOUT_PATH}> -- LogOut -- </Link>
                            </ProtectedRoutes>
                        }/>

                        <Route path={SETUP_PROFILE_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <SetupProfileContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={BUILD_YOUR_PROFILE_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <BuildProfileView isFanView={true}/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={LOCATION_DETAILS_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <LocationDetailsContainer/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={SCHOOL_AND_SPORT_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <SchoolAndSportContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={SELECT_SPORT_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <SelectSportContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={CREATING_FEED_PATH} element={
                            // <ProtectedRoutes isLoggedIn={isLoggedIn}>
                            <ProtectedRoutes isLoggedIn={true}>
                                <CreatingFeedView/>
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
