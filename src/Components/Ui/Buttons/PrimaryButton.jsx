import React from "react";
import SpinSvg from "../../../Media/icons/spin.svg"

export default function PrimaryButton({ className, label, clickEvent, isLoading, disabled = false }) {
    return (
        label ? (
            <button disabled={!!isLoading || disabled} onClick={() => clickEvent()} className={`px-4 py-2  disabled:opacity-75 rounded-md transition  bg-primary  text-white flex items-center justify-center ${className}`}>
                {isLoading ? (<><img className="animate-spin mr-1" width={20} src={SpinSvg} alt="" /> Loading...</>) : label}
            </button>) : null
    )
}