import React from "react";

export default function Alert({isError, className, message}) {
    return (
        isError ? (
            <div
                className={`bg-white text-gray-600 px-4 py-4 font-bold rounded-tr-md rounded-md border-l-4 text-sm px-2 mb-1 ${className}`} >
                {message}
            </div>
        ) : null
    )
}