import React, {useEffect} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import {useNavigate} from "react-router-dom";
import SportIcon from "../../Ui/SportIcon";
import americanball from "../../../Media/icons/americanball.svg";
import basketball from "../../../Media/icons/basketball.svg";
import bowlingball from "../../../Media/icons/bowlingball.svg";
import football from "../../../Media/icons/football.svg";
import tennisball from "../../../Media/icons/tennisball.svg";
import vollyball from "../../../Media/icons/vollyball.svg";
import {CREATING_FEED_PATH, FAN_ROLE_ID, SETUP_PROFILE_PATH} from "../../../state/constants/Constans";

export default function SelectSportView({formData, setProfileForm, createFanProfileRequest}) {

    const navigate = useNavigate();


    useEffect(() => {
        if (!formData) navigate(SETUP_PROFILE_PATH)
    }, [])


    useEffect(() => {
        setProfileForm({
            formData: {
                ...formData,
                sportId: 1
            }
        })
    }, [])


    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">What sports do you follow?</h1>

                    <div className="grid grid-cols-4 gap-1 lg:gap-3 items-center">
                        <SportIcon
                            src={bowlingball}
                            isDisabled={true}
                            className="mr-1"
                        />

                        <div className="grid gap-4 lg:gap-5 mr-1">
                            <SportIcon
                                src={football}
                                isDisabled={true}
                            />
                            <SportIcon
                                src={americanball}
                                isDisabled={true}
                            />
                        </div>

                        <div className="grid gap-4 lg:gap-5 ml-1">
                            <SportIcon
                                src={basketball}
                                isActive={true}
                            />
                            <SportIcon
                                src={vollyball}
                                isDisabled={true}
                            />
                        </div>

                        <SportIcon
                            src={tennisball}
                            isDisabled={true}
                            className="ml-1"
                        />
                    </div>

                    <p className="w-80 text-center font-sans my-10 font-light text-white">
                        Selecting your favorite sport provides you with the most up-to-date news and other info on team
                        and player.
                    </p>

                    <PrimaryButton
                        label="Next"
                        className="font-medium w-64 md:text-lg"
                        clickEvent={() => createFanProfileRequest(formData, navigate)}
                        // clickEvent={() => navigate(CREATING_FEED_PATH)}
                    />

                </main>
            </ProfileSetupWrapper>
        </>
    )
}