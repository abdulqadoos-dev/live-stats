import React from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import Logo from "../../../Media/Logo@3x.png";

export default function SetupProfileView() {
    return (
        <>
            <ProfileSetupWrapper>
                <main>
                    <h1 className="text-3xl text-white">What are you?</h1>
                    <div className="flex">
                        <div className="text-center bg-sky-400 rounded h-80 px-5 ">
                            <img src={Logo} className="w-26 lg:w-28" alt=""/>
                            <h1 className="text-3xl ">I'm a fan!</h1>
                        </div>
                    </div>
                </main>

            </ProfileSetupWrapper>
        </>
    )
}