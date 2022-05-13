import React, {useEffect, useState} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import Alert from "../../Ui/Alerts/Alert";
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import {useNavigate} from "react-router-dom";
import {
    SETUP_PROFILE_PATH, UPLOAD_ROSTERS
} from "../../../state/constants/Constans";

export default function SchoolAndSportView({isLoading, validations, error, formData, setProfileForm}) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!formData) navigate(SETUP_PROFILE_PATH)
    }, [])


    useEffect(() => {
        setProfileForm({
            formData: {
                ...formData,
                sportId: 1,
                gender: "male"
            }
        })
    }, [])


    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setProfileForm({
            formData: {
                ...formData,
                [target.name]: target.value
            }
        })
    }

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">What's your school and sport ?</h1>
                    <section className="flex flex-col gap-1 lg:gap-0.5 w-64">

                        <Alert
                            message={error}
                            className="border-rose-500"
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className={`px-4 py-3  ${validations?.state ? 'rounded-none' : 'rounded-t-md'}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.state}
                        />

                        <input
                            type="text"
                            name="school"
                            placeholder="School"
                            className={`px-4 py-3  ${validations?.school && ''}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.school}
                        />

                        <input
                            type="text"
                            name="sport"
                            readOnly
                            placeholder="Basket ball"
                            value="Basket ball"
                            className={`px-4 py-3  ${validations?.sport && ''}`}
                            // onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.sport}
                        />


                        <input
                            type="number"
                            name="liveStatCode"
                            placeholder="Live stat code"
                            className={`px-4 py-3  ${validations?.liveStatCode ? 'rounded-none' : 'rounded-b-md'}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.code}
                        />

                        <div>
                            <p className="w-64 text-center font-sans my-10 font-light text-white	">
                                You should have received a code for you team. If you haven't received a code <a
                                href="#" className="font-bold text-white">Click Here</a>
                            </p>
                        </div>


                        {/*<PrimaryButton*/}
                        {/*    label="Next"*/}
                        {/*    isLoading={isLoading}*/}
                        {/*    clickEvent={_handelFormSubmit}*/}
                        {/*    className="font-medium w-52  md:w-64  md:text-lg"*/}
                        {/*/>*/}


                        <PrimaryButton
                            label="Next"
                            className="font-medium w-64 md:text-lg"
                            clickEvent={() => navigate(UPLOAD_ROSTERS)}
                        />

                    </section>

                </main>
            </ProfileSetupWrapper>
        </>
    )
}