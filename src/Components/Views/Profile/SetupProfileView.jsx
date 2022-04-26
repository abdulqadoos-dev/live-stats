import React, {useState} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import fan from "../../../Media/icons/fan.svg";
import team from "../../../Media/icons/team.svg";
import {ReactSVG} from "react-svg";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import {useNavigate} from "react-router-dom";
import {BUILD_YOUR_PROFILE_PATH} from "../../../state/constants/Constans";

export default function SetupProfileView() {

    const [active, setActive] = useState("fan")
    const navigate = useNavigate();
    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-4 md:mb-8">What are you?</h1>
                    <div className="flex gap-4 md:gap-8">
                        <div
                            className={`grid content-center justify-items-center cursor-pointer  hover:bg-primary transition hover:text-white rounded profile-setup-tile
                             ${active === "fan" ? "bg-primary text-white active" : "text-secondary bg-white"}`}
                            onClick={() => setActive("fan")}
                        >
                            <ReactSVG src={fan}/>
                            <h1 className="text-xl md:text-3xl">I'm a fan!</h1>
                        </div>
                        <div
                            className={`grid content-center justify-items-center cursor-pointer  hover:bg-primary transition hover:text-white rounded profile-setup-tile 
                            ${active === "team" ? "bg-primary text-white active" : "text-secondary bg-white"}`}
                            onClick={() => setActive("team")}
                        >
                            <ReactSVG src={team}/>
                            <h1 className="text-xl md:text-3xl">I'm a team!</h1>
                        </div>
                    </div>

                    {active && (
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