import React from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import {useNavigate} from "react-router-dom";
import creatingFeed from "../../../Media/icons/creating-feed.svg";
import {ReactSVG} from "react-svg";
import {BASE_PATH} from "../../../state/constants/Constans";

export default function CreatingFeedView() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate(BASE_PATH)
    },3000)

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