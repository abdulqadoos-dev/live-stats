import React from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import LoginBackground from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
export default function LoginView() {

    return (
        <BackgroundImage backgroundImage={LoginBackground}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <section>
                    <img src={Logo} className="w-56 lg:w-64" alt=""/>
                </section>
                <section className="flex flex-col gap-0.5">
                    <input className="px-4 py-3 rounded-t-md" type="email" placeholder="Email"/>
                    <input className="px-4 py-3 rounded-b-md" type="password" placeholder="Password"/>
                    <DarkButton label="Login" className="my-2"/>
                </section>
                <section className="text-white text-center">
                    <p className="mb-3">Forget your password?</p>
                    <p>Don't have an account? <a href="#" className="font-bold">Sign Up</a></p>
                </section>
            </section>
        </BackgroundImage>
    )
}