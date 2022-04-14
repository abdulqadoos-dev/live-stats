import React from "react";

export default function Alert({isError, className, message}) {
    return (
        isError ? (
            <div
                className={`bg-white px-4 py-3 rounded-tr-md rounded-br-md border-l-4 text-md border-rose-500 px-2 text-rose-500 mb-1 ${className}`} >
                {message}
            </div>
        ) : null
    )
}