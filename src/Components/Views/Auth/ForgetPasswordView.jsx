import React from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackgroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"

export default function ForgetPasswordView() {

    return (
        <BackgroundImage backgroundImage={AuthBackgroundImage}>
            <section className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <img src={Logo} className="w-56 lg:w-64" alt=""/>

                {/*<div className="flex flex-col gap-1 lg:gap-0.5">*/}
                {/*    <input className="px-4 py-3 rounded-md" type="email" placeholder="Email"/>*/}
                {/*    <DarkButton label="Reset Password" className="my-2"/>*/}
                {/*</div>*/}

                {/*<div className="text-white text-center">*/}
                {/*    <p>Have an account? <a href="#" className="font-bold">Sign In</a></p>*/}
                {/*</div>*/}

                {/*<div className="flex flex-col gap-1 lg:gap-0.5">*/}
                {/*    <input className="px-4 py-3 rounded-md" type="text" placeholder="Verification Code"/>*/}
                {/*    <DarkButton label="Continue" className="my-2"/>*/}
                {/*</div>*/}

                {/*<div className="text-white text-center">*/}
                {/*    <p>Don't receive an email? <a href="#" className="font-bold">Try Again</a></p>*/}
                {/*</div>*/}

                <div className="flex flex-col gap-1 lg:gap-0.5">
                    <input className="px-4 py-3 rounded-t-md" type="password" placeholder="New Password"/>
                    <input className="px-4 py-3 rounded-b-md" type="password" placeholder="Confirm Password"/>
                    <DarkButton label="Update Password" className="my-2"/>
                </div>

                <div className="text-white text-center">
                    <p>Have an account? <a href="#" className="font-bold">Sign In</a></p>
                </div>

            </section>
        </BackgroundImage>
    )
}