import React, { useEffect, useState } from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import { FORGET_PASSWORD_PATH, SIGNUP_PATH } from "../../../state/constants/Constans";
import { Link, useNavigate } from "react-router-dom";

export default function LoginView({ isLoading, validations, error,loginRequest }) {

    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const _handelInputChange = (event, name = null) => {
        const target = event.target;
        setFormData({ ...formData, [target.name]: target.value })
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
                    <img src={Logo} className="w-56 lg:w-64" alt="" />
                </section>
                <section className="flex flex-col gap-1 lg:gap-0.5">
                   {error && (<div className="bg-white px-4 py-3 rounded-tr-md rounded-br-md border-l-4 text-md border-rose-500 px-2  text-rose-500 mb-1 ">{error}</div>)} 
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`px-4 py-3 rounded-t-md ${validations?.email && 'border-l-4 border-rose-500 '}`}
                        onChange={_handelInputChange}
                    />
                    <span className="bg-white border-l-4 text-sm border-rose-500 px-2 text-rose-500 capitalize">{validations?.email && validations.email }</span>
                   
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`px-4 py-3  ${validations?.password ? 'border-l-4 border-rose-500 rounded-none' : 'rounded-b-md'}`}
                        onChange={_handelInputChange}
                    />
                    <span className="bg-white border-l-4 text-sm border-rose-500 px-2  text-rose-500 rounded-b-md capitalize">{validations?.password && validations.password }</span>
                    {/* bg-rose-200 */}

                    <DarkButton
                        label="Login"
                        isLoading={isLoading}
                        clickEvent={_handelFormSubmit}
                        className="my-2"
                    />

                </section>
                <section className="text-white text-center">
                    <p className="mb-3 hover:underline"><Link to={FORGET_PASSWORD_PATH}>Forget your password?</Link></p>
                    <p>Don't have an account? <Link to={SIGNUP_PATH} className="font-bold hover:underline">Sign Up</Link></p>
                </section>
            </section>
        </BackgroundImage>
    )
}