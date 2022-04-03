import React from "react";

export default function DarkButton({className, label}) {
    return (
        label ? (<button className={`px-4 py-3 rounded-md bg-gray-900 text-white ${className}`}>{label}</button>) : null
    )
}