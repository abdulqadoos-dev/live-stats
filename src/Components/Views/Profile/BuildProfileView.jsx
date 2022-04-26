import React, {useState} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import fanMain from "../../../Media/icons/fan-main.svg";
import teamMain from "../../../Media/icons/team-main.svg";

import fan from "../../../Media/icons/fan.svg";
import team from "../../../Media/icons/team.svg";

import {ReactSVG} from "react-svg";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import { LOCATION_DETAILS_PATH} from "../../../state/constants/Constans";
import {useNavigate} from "react-router-dom";

export default function BuildProfileView({isFanView}) {
    const navigate = useNavigate();

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Let's build your profile</h1>
                    <div
                        className="grid content-center justify-items-center text-white build-profile-svg">
                        <ReactSVG src={isFanView ? fan : team}/>
                         <p className="w-80 text-center font-sans my-10 font-light">Your profile helps create a customized experience
                            with your favorite teams, local news, and much more! Your profile can always be updated
                            later.</p>
                    </div>

                    <PrimaryButton
                        label="Next"
                        className="font-medium w-64  md:text-lg"
                        clickEvent={() => navigate(LOCATION_DETAILS_PATH)}
                    />

                </main>
            </ProfileSetupWrapper>
        </>
    )
}