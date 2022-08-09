import React from "react"
import {Routes, Route} from "react-router";
import {BrowserRouter, Link, useNavigate} from "react-router-dom";

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
    BUILD_YOUR_PROFILE_PATH,
    UPLOAD_ROSTERS,
    ROSTERS_PATH,
    TEAMS_PATH,
    ROSTERS_EDIT_PATH,
    GAMES_PATH,
    GAMES_FORM_PATH,
    GAMES_BOARD_PATH,
    FANS_PATH, FANS_GAME_BOARD_PATH
} from "../../state/constants/Constans";

import AuthRoutes from "../Includes/AuthRoutes";
import CreatingFeedView from "./Profile/CreatingFeedView";
import ProtectedRoutes from "../Includes/ProtectedRoutes";
import FanProtectedRoutes from "../Includes/FanProtectedRoutes";

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
import RosterEditContainer from "../Containers/Rosters/RostersEditContainer";
import GameContainer from "../Containers/Games/GamesContainer";
import GameFormContainer from "../Containers/Games/GameFormContainer";
import HomeContainer from "../Containers/HomeContainer";
import GameBoardContainer from "../Containers/Games/GameBoardContainer";
import FansContainers from "../Containers/Fans/FansContainers";
import FanScoreBoardContainer from "../Containers/Fans/FanScoreBoardContainer";


export default function AppView(props) {

    // console.info(props, "STATE");

    const authUser = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
    const isLoggedIn = !!authUser?.user;

    return (
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path={BASE_PATH}>

                        <Route index element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <HomeContainer/>
                            </ProtectedRoutes>
                        }/>

                        {/* ---  Rosters Routes --- */}
                        <Route path={ROSTERS_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <RostersContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={ROSTERS_EDIT_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                {/*roster edit container*/}
                                <RosterEditContainer/>
                            </ProtectedRoutes>
                        }/>


                        {/* ---  Teams Routes --- */}
                        <Route path={TEAMS_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <TeamsContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={GAMES_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <GameContainer/>
                            </ProtectedRoutes>
                        }/>

                        <Route path={GAMES_FORM_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <GameFormContainer/>
                            </ProtectedRoutes>
                        }/>


                        <Route path={GAMES_BOARD_PATH} element={
                            <ProtectedRoutes isLoggedIn={isLoggedIn}>
                                <GameBoardContainer/>
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

                        {/* Fans Route */}
                        <Route path={FANS_PATH} element={
                            <FanProtectedRoutes isLoggedIn={isLoggedIn} user={authUser?.user || {}}>
                                <FansContainers/>
                            </FanProtectedRoutes>
                        }
                        />

                        <Route path={FANS_GAME_BOARD_PATH} element={
                            <FanProtectedRoutes isLoggedIn={isLoggedIn} user={authUser?.user || {}}>
                                <FanScoreBoardContainer/>
                            </FanProtectedRoutes>
                        }
                        />

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
