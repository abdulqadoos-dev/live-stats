import React from "react";
import SpinSvg from "../../../Media/icons/spin.svg"

export default function DarkButton({ className, label, clickEvent, isLoading, disabled = false }) {
    return (
        label ? (
            <button disabled={!!isLoading || disabled} onClick={() => clickEvent()} className={`px-4 py-3 disabled:opacity-75 rounded-md bg-gray-900 text-white flex items-center justify-center  ${className}`}>
                {isLoading ? (<><img className="animate-spin" width={23} src={SpinSvg} alt="" /> Loading...</>) : label}
            </button>) : null
    )
}