import React, {useEffect, useState} from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import {Link} from "react-router-dom";
import {FORGET_PASSWORD_PATH, LOGIN_PATH} from "../../../state/constants/Constans";
import {
    DEFAULT_VIEW,
    OTP_VERIFICATION_VIEW,
    RESET_PASSWORD_VIEW,
    CONFIRM_PASSWORD
} from "../../../state/constants/authConstants";
import {useNavigate} from "react-router-dom";
import {_matchPasswords} from "../../../Services/Helper"
import ValidationMessage from "../../Ui/Form/ValidationMessage";
import Alert from "../../Ui/Alerts/Alert";

export default function ForgetPasswordView(
    {
        signature,
        forgetPasswordRequest,
        activeView,
        validations,
        isLoading,
        verificationRequest,
        authUser,
        changePasswordRequest,
        message,
        error
    }
) {

    const [formData, setFormData] = useState({})
    const [passwordMatched, setPasswordMatched] = useState(null)

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({...formData, [target.name]: target.value})
    }


    const _handelSubmitEmail = () => forgetPasswordRequest(formData);

    const _handelVerificationSubmit = () => {
        let payload = {...formData, user_id: authUser.id};
        verificationRequest(payload, null, RESET_PASSWORD_VIEW);
    }

    const _handelChangePasswordSubmit = () => {
        let payload = {...formData, signature: signature};
        // changePasswordRequest(payload, navigate);
    }


    return (
        <BackgroundImage backgroundImage={AuthBackgroundImage}>
            <section className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <img src={Logo} className="w-56 lg:w-64" alt=""/>
                <div className="flex flex-col w-64">
                    <Alert
                        message={message}
                        className={"border-green-500"}
                    />
                    <Alert
                        message={error}
                        className={"border-rose-500"}
                    />
                </div>
                {activeView === DEFAULT_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5 w-64">

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={_handelInputChange}
                                className={`px-4 py-3 outline-0 rounded-md  ${validations?.email && ('')}`}
                            />
                            <ValidationMessage
                                message={validations?.email}
                            />

                            <DarkButton
                                className="my-2 outline-0"
                                label="Reset Password"
                                isLoading={isLoading}
                                clickEvent={_handelSubmitEmail}
                            />

                            <div className="text-white text-center">
                                <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                            </div>
                        </div>


                    </>
                )}


                {activeView === OTP_VERIFICATION_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5 w-64">


                            <input
                                className={`px-4 py-3 outline-0 rounded-md`}
                                type="number"
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

                        <div className="text-white text-center">
                            <p>Don't receive an email? <Link to={FORGET_PASSWORD_PATH} className="font-bold">Try
                                Again</Link></p>
                        </div>

                    </>
                )}

                {activeView === RESET_PASSWORD_VIEW && (
                    <>
                        <div className="flex flex-col gap-1 lg:gap-0.5 w-64">
                            <input
                                className={`px-4 py-3 outline-0 rounded-t-md ${validations && 'bg-rose-200 placeholder:text-rose-500'}`}
                                type="password" name="password" placeholder="New Password"
                                onChange={_handelInputChange}/>

                            <input
                                className={`px-4 py-3 outline-0 rounded-b-md ${passwordMatched && 'bg-rose-200 placeholder:text-rose-500'}`}
                                type="password" name={CONFIRM_PASSWORD} placeholder="Confirm Password"
                                onChange={(e) => _matchPasswords(formData.password, e.target.value, setPasswordMatched)}/>

                            <DarkButton label="Change Password" disabled={passwordMatched} isLoading={isLoading}
                                        clickEvent={_handelChangePasswordSubmit} className="my-2"/>
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