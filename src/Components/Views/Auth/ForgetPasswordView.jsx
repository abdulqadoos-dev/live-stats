import React, { useEffect, useState } from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../../state/constants/Constans";
import { DEFAULT_VIEW, OTP_VERIFICATION_VIEW, RESET_PASSWORD_VIEW, CONFIRM_PASSWORD } from "../../../state/constants/authConstants";
import { useNavigate } from "react-router-dom";
import { _matchPasswords } from "../../../Services/Helper"

export default function ForgetPasswordView({ signature, forgetPasswordRequest, activeView, validations, isLoading, verificationRequest, authUser, verification, changePasswordRequest }) {

    const [formData, setFormData] = useState({})
    const [passwordMatched, setPasswordMatched] = useState(null)

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({ ...formData, [target.name]: target.value })
    }


    const _handelSubmitEmail = () => {
        forgetPasswordRequest(formData);
        console.log("form submitted...");
    }

    const _handelVerificationSubmit = () => {
        let payload = { ...formData, user_id: authUser.id };
        verificationRequest(payload, null, RESET_PASSWORD_VIEW);
        console.log("verification submitted...");
    }

    const _handelChangePasswordSubmit = () => {
        console.log({signature}, "here.................")
        let payload = { ...formData, signature: signature };
        changePasswordRequest(payload, navigate);
    }

    return (
        <BackgroundImage backgroundImage={AuthBackgroundImage}>
            <section className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <img src={Logo} className="w-56 lg:w-64" alt="" />

                {activeView === DEFAULT_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5">
                            <input className={`px-4 py-3 rounded-md ${validations && 'bg-rose-200 placeholder:text-rose-500'} `} type="email" name="email" placeholder="Email" onChange={_handelInputChange} />
                            <DarkButton label="Reset Password" isLoading={isLoading} clickEvent={_handelSubmitEmail} className="my-2" />
                        </div>
                        <div className="text-white text-center">
                            <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                        </div>
                    </>
                )}



                {activeView === OTP_VERIFICATION_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5">
                            <input className={`px-4 py-3 rounded-md ${!verification ? 'bg-rose-200 placeholder:text-rose-500' : ''}`} type="text" name="otp" placeholder="Verification code" onChange={_handelInputChange} />
                            <DarkButton label="Verify" isLoading={isLoading} clickEvent={_handelVerificationSubmit} className="my-2" />
                        </div>
                        <div className="text-white text-center">
                            <p>Don't receive an email? <a href="#" className="font-bold">Try Again</a></p>
                        </div>
                    </>
                )}

                {activeView === RESET_PASSWORD_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5">
                            <input className={`px-4 py-3 rounded-t-md ${validations && 'bg-rose-200 placeholder:text-rose-500'}`} type="password" name="password" placeholder="New Password" onChange={_handelInputChange} />
                            <input className={`px-4 py-3 rounded-b-md ${passwordMatched && 'bg-rose-200 placeholder:text-rose-500'}`} type="password" name={CONFIRM_PASSWORD} placeholder="Confirm Password" onChange={(e) => _matchPasswords(formData.password, e.target.value, setPasswordMatched)} />
                            <DarkButton label="Change Password" disabled={passwordMatched}  isLoading={isLoading } clickEvent={_handelChangePasswordSubmit} className="my-2" />
                        </div>

                        <div className="text-white text-center">
                            <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                        </div>
                    </>
                )}

            </section>
        </BackgroundImage>
    )
}