import React from "react";

export default function ValidationMessage({className, message}) {
    return (
        message ? (
            <span className={`bg-white border-l-4 text-sm border-rose-500 px-2 text-rose-500 capitalize ${className}`}>{message}</span>
        ) : null
    )
}