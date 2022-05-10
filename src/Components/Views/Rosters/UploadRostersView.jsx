import React from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import {useNavigate} from "react-router-dom";
import creatingFeed from "../../../Media/icons/creating-feed.svg";
import {ReactSVG} from "react-svg";
import {BASE_PATH} from "../../../state/constants/Constans";
import {Input} from "postcss";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";

export default function UploadRostersView() {
    const navigate = useNavigate();

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center  ">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">Build your roster</h1>

                    <div className="text-white text-center font-sans">
                        <h2 className="font-bold text-xl ">Upload File</h2>
                        <p className="mb-5 opacity-80 font-light">Acceptable files include Excel or CSV</p>
                        <a href="#" className="font-bold">Download roster template</a>
                    </div>

                    <div className="my-10">
                        <div className="m-0">
                            <input
                                type="text"
                                value="Player Name"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-64"
                            />
                            <input
                                type="text"
                                value="Number"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Height"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Weight"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                            <input
                                type="text"
                                value="Position"
                                className="text-white font-sans text-sm border-r border-secondary bg-secondary-light px-2 font-bold w-32"
                            />
                        </div>

                        {/*table rows*/}
                        <div className="border-b border-secondary ">
                            <input
                                type="text"
                                value="abdul qadoos"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-64"
                            />

                            <input
                                type="text"
                                value="0316-4988701"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="10.5"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="20"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="6"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />
                        </div>
                        <div className="border-b border-secondary">
                            <input
                                type="text"
                                value="abdul qadoos"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-64"
                            />

                            <input
                                type="text"
                                value="0316-4988701"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="10.5"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="20"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />

                            <input
                                type="text"
                                value="6"
                                className="text-secondary font-sans text-sm border-secondary border-r py-1 px-2 w-32"
                            />
                        </div>
                    </div>

                    <p className="mb-5 opacity-80 font-light text-white font-sans text-lg w-[400px] text-center">
                        Add some basic player information's to start building your roster. Your can always edit the roster later on the team page as well as enter additional info.
                    </p>

                    <PrimaryButton
                        label="Next"
                        className="w-64"
                    />


                </main>
            </ProfileSetupWrapper>
        </>
    )
}