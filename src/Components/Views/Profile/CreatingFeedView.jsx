import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_PATH, LOCAL_STORAGE_AUTH_USER, TEAMS_PATH} from "../../../state/constants/Constans";

import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import creatingFeed from "../../../Media/icons/creating-feed.svg";
import {loginRequest} from "../../../state/actions/authActions";
import {connect} from "react-redux";

function CreatingFeedView() {
    const navigate = useNavigate();

    const {user} = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_AUTH_USER));

    setTimeout(() => {
        navigate(TEAMS_PATH)
    }, 2000)

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Creating your feed</h1>
                    <div
                        className="grid content-center justify-items-center text-white build-profile-tile">
                        <img src={creatingFeed} className="w-56 lg:w-64 mt-10"/>
                    </div>
                </main>
            </ProfileSetupWrapper>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        loginRequest: (formData, navigate) => dispatch(loginRequest(formData, navigate)),
    }
}

export default connect(mapDispatchToProps)(CreatingFeedView)