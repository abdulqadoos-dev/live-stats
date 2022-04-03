import React from "react";

export default function LoginView() {
    return(
        <main className="bg-blue-500">
            <section>
                <h1>Live <span>stats</span></h1>
            </section>
            <form action="">
                <input type="email"/>
                <input type="password"/>
                <button>Login</button>
            </form>
            <section>
                <p>forget your password?</p>
                <p>Don't have an account? <span>Sign Up</span></p>
            </section>
        </main>
    )
}