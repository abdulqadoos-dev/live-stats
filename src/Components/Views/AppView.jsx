import React from "react"
import {Routes, Route} from "react-router";
import {BrowserRouter, Link} from "react-router-dom";

import {
    BASE_PATH,
    LOGIN_PATH,
    SIGNUP_PATH,
    LOGOUT_PATH,
    PAGE_NOT_FOUND,
    SELECT_SPORT_PATH,
    SETUP_PROFILE_PATH,
    CREATING_FEED_PATH,
    FORGET_PASSWORD_PATH,
    SCHOOL_AND_SPORT_PATH,
    LOCATION_DETAILS_PATH,
    LOCAL_STORAGE_AUTH_USER,
    BUILD_YOUR_PROFILE_PATH, UPLOAD_ROSTERS, ROSTERS_PATH, TEAMS_PATH
} from "../../state/constants/Constans";

import AuthRoutes from "../Includes/AuthRoutes";
import CreatingFeedView from "./Profile/CreatingFeedView";
import ProtectedRoutes from "../Includes/ProtectedRoutes";

import LoginContainer from "../Containers/Auth/LoginContainer";
import LogoutContainer from "../Containers/Auth/LogoutContainer";
import SignupContainer from "../Containers/Auth/SignupContainer";
import SelectSportContainer from "../Containers/Profile/SelectSportContainer";
import SetupProfileContainer from "../Containers/Profile/SetupProfileContainer";
import BuildProfileContainer from "../Containers/Profile/BuildProfileContainer";
import ForgetPasswordContainer from "../Containers/Auth/ForgetPasswordContainer";
import SchoolAndSportContainer from "../Containers/Profile/SchoolAndSportContainer";
import LocationDetailsContainer from "../Containers/Profile/LocationDetailsContainer";
import UploadRosterContainer from "../Containers/Rosters/UploadRostersContainer";
import RostersContainer from "../Containers/Rosters/RostersContainer";
import TeamsContainer from "../Containers/Teams/TeamsContainers";


export default function AppView(props) {

    // console.log({isLoggedIn}, props.auth, "AUTH STATE");
    console.info(props.profile.formData, "STATE");
    // console.info(props, "STATE");
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
                                <button><Link to={LOGOUT_PATH}> -- LogOut -- </Link></button>
                            </ProtectedRoutes>
                        }/>

                        {/* ---  Rosters Routes --- */}
                        <Route path={ROSTERS_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <RostersContainer/>
                            </ProtectedRoutes>
                        }/>


                        {/* ---  Teams Routes --- */}
                        <Route path={TEAMS_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <TeamsContainer/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={SETUP_PROFILE_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <SetupProfileContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={BUILD_YOUR_PROFILE_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <BuildProfileContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={LOCATION_DETAILS_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <LocationDetailsContainer/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={SCHOOL_AND_SPORT_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <SchoolAndSportContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={SELECT_SPORT_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <SelectSportContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={CREATING_FEED_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <CreatingFeedView/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={UPLOAD_ROSTERS} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <UploadRosterContainer/>
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
