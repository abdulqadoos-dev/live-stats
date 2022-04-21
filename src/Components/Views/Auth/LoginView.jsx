import React, {useState} from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import {FORGET_PASSWORD_PATH, SIGNUP_PATH} from "../../../state/constants/Constans";
import {Link, useNavigate} from "react-router-dom";
import Alert from "../../Ui/Alerts/Alert";
import ValidationMessage from "../../Ui/Form/ValidationMessage";

export default function LoginView({isLoading, validations, error, loginRequest}) {

    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({...formData, [target.name]: target.value})
    }

    const _handelFormSubmit = async () => {
        loginRequest(formData, navigate);
        console.log("form submitted...");
    }

    // console.log({error},{validations}, "error");

    return (
        <BackgroundImage backgroundImage={AuthBackgroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <section>
                    <img src={Logo} className="w-56 lg:w-64" alt=""/>
                </section>
                <section className="flex flex-col gap-1 lg:gap-0.5 w-64">

                    <Alert
                        message={error}
                        className="border-rose-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`px-4 py-3 rounded-t-md ${validations?.email && ''}`}
                        onChange={_handelInputChange}
                    />
                    <ValidationMessage
                        message={validations?.email}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`px-4 py-3  ${validations?.password ? 'rounded-none' : 'rounded-b-md'}`}
                        onChange={_handelInputChange}
                    />
                    <ValidationMessage
                        message={validations?.password}
                    />

                    <DarkButton
                        label="Login"
                        isLoading={isLoading}
                        clickEvent={_handelFormSubmit}
                        className="my-2"
                    />

                </section>
                <section className="text-white text-center">
                    <p className="mb-3 hover:underline"><Link to={FORGET_PASSWORD_PATH}>Forget your password?</Link></p>
                    <p>Don't have an account? <Link to={SIGNUP_PATH} className="font-bold hover:underline">Sign
                        Up</Link></p>
                </section>
            </section>
        </BackgroundImage>
    )
}