import React, { useEffect, useState } from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import { FORGET_PASSWORD_PATH, SIGNUP_PATH } from "../../../state/constants/Constans";
import { Link, useNavigate } from "react-router-dom";

export default function LoginView({ isLoading, validations, loginRequest }) {

    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({ ...formData, [target.name]: target.value })
    }

    const _handelFormSubmit = async () => {
        loginRequest(formData,navigate);
        console.log("form submitted...");
    }


    return (
        <BackgroundImage backgroundImage={AuthBackgroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <section>
                    <img src={Logo} className="w-56 lg:w-64" alt="" />
                </section>
                <section className="flex flex-col gap-1 lg:gap-0.5">
                    <input className="px-4 py-3 rounded-t-md" type="email" name="email" placeholder="Email" onChange={_handelInputChange} />
                    <input className="px-4 py-3 rounded-b-md" type="password" name="password" placeholder="Password" onChange={_handelInputChange} />
                    <DarkButton label="Login" isLoading={isLoading} clickEvent={_handelFormSubmit} className="my-2" />
                </section>
                <section className="text-white text-center">
                    <p className="mb-3 hover:underline"><Link to={FORGET_PASSWORD_PATH}>Forget your password?</Link></p>
                    <p>Don't have an account? <Link to={SIGNUP_PATH} className="font-bold hover:underline">Sign Up</Link></p>
                </section>
            </section>
        </BackgroundImage>
    )
}