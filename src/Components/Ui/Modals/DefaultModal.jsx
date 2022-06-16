import React from "react";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function DefaultModal({children, title}) {
    return (
        <div className="h-screen w-screen bg-black/75 fixed top-0 left-0 z-10 grid justify-center content-center">
            <div className="bg-white w-96 h-96 rounded-md px-4 py-2 ">
                <div className="text-center mt-2 font-bold text-xl">
                    {title}
                </div>
                {children}
            </div>

            <PrimaryButton
                label="Next"
                className="mt-5 py-3 hover:bg-secondary-light text-xl"
            />

        </div>

    )
}