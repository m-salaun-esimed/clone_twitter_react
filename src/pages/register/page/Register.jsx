import React from "react";
import FormRegister from "../components/FormRegister";

function Register() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="bg-black shadow-lg rounded-2xl p-8 w-full max-w-md">
                <img
                    src="/images/twitter.jpg"
                    className="w-32 h-auto mb-4 mx-auto block"
                    alt="Logo"
                />
                <h1 className="text-2xl font-bold text-center text-white mb-6">
                    Enregistrez-vous !
                </h1>
            </div>
            <FormRegister />
        </div>
    );
}

export default Register;
