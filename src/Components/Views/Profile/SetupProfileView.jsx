import React, {useEffect, useState} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import fan from "../../../Media/icons/fan.svg";
import team from "../../../Media/icons/team.svg";
import {ReactSVG} from "react-svg";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import {useNavigate} from "react-router-dom";
import {BUILD_YOUR_PROFILE_PATH, FAN_ROLE_ID, TEAM_ROLE_ID} from "../../../state/constants/Constans";

export default function SetupProfileView({formData, setProfileForm}) {

    const navigate = useNavigate();

    useEffect(() => {
        setProfileForm({
            formData: {
                roleId: FAN_ROLE_ID,
                sportId: 1
            }
        })
    }, [])

    const _handleInputChange = (roleId) => {
        setProfileForm({
            formData: {
                roleId
            }
        })
    }

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-4 md:mb-8">What are you?</h1>
                    <div className="flex gap-4 md:gap-8">
                        <div
                            className={`grid content-center justify-items-center cursor-pointer  hover:bg-primary transition hover:text-white rounded profile-setup-tile
                             ${formData?.roleId === FAN_ROLE_ID ? "bg-primary text-white active" : "text-secondary bg-white"}`}
                            onClick={() => _handleInputChange(FAN_ROLE_ID)}
                        >
                            <ReactSVG src={fan}/>
                            <h1 className="text-xl md:text-3xl">I'm a fan!</h1>
                        </div>
                        <div
                            className={`grid content-center justify-items-center cursor-pointer  hover:bg-primary transition hover:text-white rounded profile-setup-tile 
                            ${formData?.roleId === TEAM_ROLE_ID ? "bg-primary text-white active" : "text-secondary bg-white"}`}
                            onClick={() => _handleInputChange(TEAM_ROLE_ID)}
                        >
                            <ReactSVG src={team}/>
                            <h1 className="text-xl md:text-3xl">I'm a team!</h1>
                        </div>
                    </div>

                    {formData?.roleId && (
                        <PrimaryButton
                            label="Next"
                            className="font-medium mt-4 w-64 md:mt-8 md:text-lg"
                            clickEvent={() => navigate(BUILD_YOUR_PROFILE_PATH)}
                        />
                    )}

                </main>
            </ProfileSetupWrapper>
        </>
    )
}