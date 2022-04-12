import React, { useEffect, useState } from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackGroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import { Link } from "react-router-dom";
import { BASE_PATH, LOGIN_PATH } from "../../../state/constants/Constans";
import 'react-phone-number-input/style.css'
import { useNavigate } from "react-router-dom";

import { DEFAULT_VIEW, OTP_VERIFICATION_VIEW } from "../../../state/constants/authConstants";

export default function SignupView({ authUser, signupRequest, validations, signupForm, isLoading, activeView, verificationRequest, verification }) {

    const [formData, setFormData] = useState({})
    const [passwordMatched, setSetPasswordMatched] = useState(null)

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({ ...formData, [target.name]: target.value })
    }

    const _handelFormSubmit = () => {
        signupRequest(formData);
    }

    const _handelVerificationSubmit = () => {
        let payload = { ...formData, user_id: authUser.id };
        verificationRequest(payload, navigate);
    }

    return (
        <BackgroundImage backgroundImage={AuthBackGroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <div>
                    <img src={Logo} className="w-56 lg:w-64" alt="" />
                </div>

                {activeView === DEFAULT_VIEW && (
                    <div className="flex flex-col gap-1 lg:gap-0.5">
                        <input className={`px-4 py-3 rounded-t-md ${validations && validations.key === "name" ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="text" name="name" placeholder="Name" onChange={_handelInputChange} />
                        <input className={`px-4 py-3 ${validations && validations.key === "phone" ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="text" placeholder="Phone" name="phone" onChange={_handelInputChange} />
                        <input className={`px-4 py-3 ${validations && validations.key === "email" ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="email" placeholder="Email" name="email" onChange={_handelInputChange} />
                        <input className={`px-4 py-3 ${validations && validations.key === "password" ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="password" placeholder="Password" name="password" onChange={_handelInputChange} />
                        <input className={`px-4 py-3 rounded-b-md  ${validations && validations.key === "password" ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={_handelInputChange} />
                        <DarkButton label="Sign Up" isLoading={isLoading} clickEvent={_handelFormSubmit} className="my-2" />
                    </div>
                )}

                {activeView === OTP_VERIFICATION_VIEW && (
                    <div className="flex flex-col gap-1 lg:gap-0.5">
                        <input className={`px-4 py-3 rounded-md ${!verification ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="text" name="otp" placeholder="Verification code" onChange={_handelInputChange} />
                        <DarkButton label="Verify" isLoading={isLoading} clickEvent={_handelVerificationSubmit} className="my-2" />
                    </div>
                )}

                <div className="text-white text-center">
                    <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                </div>
            </section>
        </BackgroundImage>
    )
}

