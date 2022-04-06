import React, {useEffect} from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackGroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import {Link} from "react-router-dom";
import {LOGIN_PATH} from "../../../Services/Constans";

export default function SignupView() {

    useEffect(() => {
        console.log("SIGNUP VIEW RENDERS")
    },[])

    return (
        <BackgroundImage backgroundImage={AuthBackGroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <section>
                    <img src={Logo} className="w-56 lg:w-64" alt=""/>
                </section>
                <section className="flex flex-col gap-1 lg:gap-0.5">
                    <input className="px-4 py-3 rounded-t-md" type="text" placeholder="Name"/>
                    <input className="px-4 py-3" type="email" placeholder="Email"/>
                    <input className="px-4 py-3" type="password" placeholder="Password"/>
                    <input className="px-4 py-3 rounded-b-md" type="password" placeholder="Confirm Password"/>
                    <DarkButton label="Sign Up" className="my-2"/>
                </section>
                <section className="text-white text-center">
                    <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                </section>
            </section>
        </BackgroundImage>
    )
}

