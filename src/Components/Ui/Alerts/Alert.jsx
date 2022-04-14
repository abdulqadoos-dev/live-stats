import React from "react";

export default function Alert({className, message}) {
    return (
        message ? (
            <div
                className={`bg-white text-gray-600 text-sm font-bold py-4 px-4 mb-1 rounded-md border-l-4 ${className}`}>
                {message}
            </div>
        ) : null
    )
}