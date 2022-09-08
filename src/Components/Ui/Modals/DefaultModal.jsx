import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";
import {ReactSVG} from "react-svg";

export default function DefaultModal({children, title, clickEvent, closeEvent, isDisabledButton, className , buttonLabel = "Next" }) {
    return (
        <div
            className={`h-screen w-screen bg-black/75 fixed top-0 left-0 z-30 grid justify-center content-center `}>
            <div className={`bg-white w-96 rounded-md px-4 py-2 relative ${className}`}>
                {closeEvent && (
                    <div className="bg-red-700 w-6 h-6 absolute right-2 top-[-15px] text-center rounded-full z-10 cursor-pointer close-modal"
                         onClick={() => closeEvent()}
                    >
                        <ReactSVG src={"/icons/plus.svg"}/>
                    </div>
                )}
                <div className="text-center mt-2 font-bold text-xl">
                    {title}
                </div>
                {children}
            </div>
            <PrimaryButton
                label={buttonLabel}
                disabled={isDisabledButton}
                clickEvent={!isDisabledButton ? clickEvent : () => console.log("Disabled")}
                className={`mt-5 py-3  ${!isDisabledButton && "hover:bg-secondary-light"}  text-xl`}
            />
        </div>
    )
}