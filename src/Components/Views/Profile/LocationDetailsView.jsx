import React, {useEffect, useState} from "react";
import ProfileSetupWrapper from "../../Ui/ProfileSetupWrapper";
import PrimaryButton from "../../Ui/Buttons/PrimaryButton";
import Alert from "../../Ui/Alerts/Alert";
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import {useNavigate} from "react-router-dom";
import {FAN_ROLE_ID, LOCATION_DETAILS_PATH, SELECT_SPORT_PATH} from "../../../state/constants/Constans";

export default function LocationDetailsView({isLoading, validations, error, formData, setProfileForm}) {


    const navigate = useNavigate();

    useEffect(() => {
        setProfileForm({
            formData: {
                ...formData,
                location: null
            }
        })
    }, [])


    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setProfileForm({
            formData: {
                ...formData, location: {
                    [target.name]: target.value
                }
            }
        })
    }

    return (
        <>
            <ProfileSetupWrapper>
                <main className="grid justify-items-center">
                    <h1 className="text-3xl md:text-4xl text-white mb-10 md:mb-10">What's your location ?</h1>
                    <section className="flex flex-col gap-1 lg:gap-0.5 w-64">

                        <Alert
                            message={error}
                            className="border-rose-500"
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className={`px-4 py-3 rounded-t-md ${validations?.city && ''}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.city}
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className={`px-4 py-3  ${validations?.state ? 'rounded-none' : ''}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.state}
                        />

                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip"
                            className={`px-4 py-3  ${validations?.zip ? 'rounded-none' : 'rounded-b-md'}`}
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.zip}
                        />

                        <div>
                            <p className="w-64 text-center font-sans my-10 font-light text-white">
                                Knowing your location helps you be in the know about what's happening locally and in
                                surrounding areas.
                            </p>
                        </div>

                        <PrimaryButton
                            label="Next"
                            className="font-medium w-64  md:text-lg"
                            clickEvent={() => navigate(SELECT_SPORT_PATH)}
                        />

                    </section>

                </main>
            </ProfileSetupWrapper>
        </>
    )
}