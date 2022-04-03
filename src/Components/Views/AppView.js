import React from "react"

export default function AppView(props) {
    return(
        <div className="container bg-amber-700">
            <div>Count: {props.count}</div>
            <button onClick={() => props.increaseCounter()}>Increase Count</button>
            <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
        </div>
    )
}