import React, { useEffect } from "react";
import Formulaire from "../components/FormLogin.jsx";

function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="bg-black shadow-lg rounded-2xl p-8 w-full max-w-md">
                <img
                    src="/images/twitter.jpg"
                    className="w-32 h-auto mb-4 mx-auto block"
                    alt="Logo"
                />
                <h1 className="text-2xl font-bold text-center text-white mb-6">
                    Authentifiez-vous !
                </h1>
            </div>
            <Formulaire />
        </div>
    );
}

export default Login;
