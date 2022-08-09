import React, {useEffect, useState} from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackGroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import {Link} from "react-router-dom";
import {BASE_PATH, LOGIN_PATH} from "../../../state/constants/Constans";
import 'react-phone-number-input/style.css'
import {useNavigate} from "react-router-dom";

import {CONFIRM_PASSWORD, DEFAULT_VIEW, OTP_VERIFICATION_VIEW} from "../../../state/constants/authConstants";
import Alert from "../../Ui/Alerts/Alert";
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import {_matchPasswords} from "../../../Services/Helper";

export default function SignupView(
    {
        authUser,
        signupRequest,
        validations,
        signupForm,
        isLoading,
        activeView,
        verificationRequest,
        verification,
        error,
        message
    }
) {

    const [formData, setFormData] = useState({isAgree: true})
    const [passwordMatched, setPasswordMatched] = useState(null)

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({...formData, [target.name]: target.value})
    }

    const _handelFormSubmit = () => {
        signupRequest(formData);
    }

    const _handelVerificationSubmit = () => {
        let payload = {...formData, user_id: authUser.id};
        verificationRequest(payload, navigate);
    }

    return (
        <BackgroundImage backgroundImage={AuthBackGroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center ">
                <div>
                    <img src={Logo} className="w-56 lg:w-64" alt=""/>
                </div>

                {activeView === DEFAULT_VIEW && (
                    <div className="flex flex-col gap-1 lg:gap-0.5 w-64">
                        <Alert
                            message={error}
                            className="border-rose-500"
                        />

                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={_handelInputChange}
                            className={`px-4 py-3 outline-0 outline-0 rounded-t-md ${validations?.name && ('')}`}
                        />
                        <ValidationMessage
                            message={validations?.name}
                        />


                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={_handelInputChange}
                            className={`px-4 py-3 outline-0 ${validations?.phone && ('')}`}
                        />
                        <ValidationMessage
                            message={validations?.phone}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={_handelInputChange}
                            className={`px-4 py-3 outline-0 ${validations?.email && ('')}`}
                        />
                        <ValidationMessage
                            message={validations?.email}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={_handelInputChange}
                            className={`px-4 py-3 outline-0 ${validations?.password && ('')}`}
                        />
                        <ValidationMessage
                            message={validations?.password}
                        />


                        <input
                            type="password"
                            name={CONFIRM_PASSWORD}
                            placeholder="Confirm Password"
                            className={`px-4 py-3 outline-0 rounded-b-md ${passwordMatched && ''}`}
                            onChange={(e) => _matchPasswords(formData.password, e.target.value, setPasswordMatched)}
                        />

                        <ValidationMessage
                            message={passwordMatched && "Password dose's matched"}
                        />

                        <DarkButton
                            label="Sign Up"
                            className="my-2"
                            isLoading={isLoading}
                            disabled={passwordMatched}
                            clickEvent={_handelFormSubmit}
                        />

                    </div>
                )}

                {activeView === OTP_VERIFICATION_VIEW && (
                    <div className="flex flex-col gap-1 lg:gap-0.5 w-64">
                        <Alert
                            message={message}
                            className="border-green-500"
                        />
                        <Alert
                            message={error}
                            className={"border-rose-500"}
                        />
                        <input
                            className={`px-4 py-3 outline-0 rounded-md ${!verification ? '' : ''}`}
                            type="text"
                            name="otp"
                            placeholder="Verification code"
                            onChange={_handelInputChange}
                        />
                        <ValidationMessage
                            message={validations?.otp}
                        />

                        <DarkButton
                            label="Verify"
                            isLoading={isLoading}
                            clickEvent={_handelVerificationSubmit}
                            className="my-2"
                        />
                    </div>
                )}

                <div className="text-white text-center">
                    <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                </div>
            </section>
        </BackgroundImage>
    )
}

