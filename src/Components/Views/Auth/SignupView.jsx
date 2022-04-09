import React, { useEffect } from "react";
import DarkButton from "../../Ui/Buttons/DarkButton";
import BackgroundImage from "../../Ui/BackgroundImage";
import AuthBackGroundImage from "../../../Media/login-background.jpg"
import Logo from "../../../Media/Logo@3x.png"
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../../../Services/Constans";
import { signup } from "../../../Services/Apis/auth";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function SignupView(props) {

    useEffect(() => {
        console.log("SIGNUP VIEW RENDERS")
    }, [])

    const _handelInputChange = (event, name = null) => {
        const target = name ? event.target : event;
        console.log(target);
    }

    const _handelFormSubmit = () => {
        props.increaseCounter();
        console.log(props, "form submitted...");
    }

    return (
        <BackgroundImage backgroundImage={AuthBackGroundImage}>
            <section
                className="grid grid-cols-1 gap-5 h-screen content-center justify-items-center">
                <section>
                    <img src={Logo} className="w-56 lg:w-64" alt="" />
                </section>
                <section className="flex flex-col gap-1 lg:gap-0.5">
                    <input className="px-4 py-3 rounded-t-md" type="text" name="name" placeholder="Name" onChange={_handelInputChange} />
                    <input className="px-4 py-3" type="text" placeholder="Phone" name="phone" onChange={_handelInputChange} />
                    <input className="px-4 py-3" type="email" placeholder="Email" name="email" onChange={_handelInputChange} />
                    <input className="px-4 py-3" type="password" placeholder="Password" name="password" onChange={_handelInputChange} />
                    <input className="px-4 py-3 rounded-b-md" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={_handelInputChange} />
                    <DarkButton label="Sign Up" clickEvent={_handelFormSubmit} className="my-2" />
                </section>
                <section className="text-white text-center">
                    <p>Have an account? <Link to={LOGIN_PATH} className="font-bold">Sign In</Link></p>
                </section>
            </section>
        </BackgroundImage>
    )
}

