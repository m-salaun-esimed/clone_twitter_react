import React, { useState, useEffect } from "react";
import { loginAPI } from "../../../domains/authentitification/auth.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setIsConnected, setToken, setIsStayConnected, setUserId } from "../../../shared/store/authSlice.js";
import { showToastError } from "../../../shared/utils/Toast.jsx";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Switch from '@mui/material/Switch';
import { ToastContainer } from "react-toastify";

function Formulaire() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isStayConnectedToggle, setIsStayConnectedToggle] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();
    const isConnected = useSelector((state) => state.auth.isConnected);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    useEffect(() => {
        if (isConnected) {
            navigate('/');
        }
    }, [isConnected, navigate]); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            showToastError(
                !trimmedEmail && !trimmedPassword
                    ? "Veuillez spécifier votre email ainsi que votre mot de passe."
                    : !trimmedEmail
                        ? "Veuillez spécifier votre email."
                        : "Veuillez spécifier votre mot de passe."
            );
            return;
        }

        try {
            let response = await loginAPI(trimmedEmail, trimmedPassword);
            dispatch(setIsStayConnected(isStayConnectedToggle));
            dispatch(setToken(response.accessToken));
            dispatch(setIsConnected(true));
        } catch (error) {
            showToastError("Échec de la connexion. Vérifiez vos identifiants.");
            console.error("Login error:", error);
        }
    };


    const nagigateRegisterPage = (() => {
        navigate("/register");
    });

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <form onSubmit={handleSubmit}>
                <div className="flex justify-center mb-4">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="email" style={{ color: 'white' }}>Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            style={{ color: 'white' }}
                            placeholder="name@mail.com"
                        />
                    </FormControl>
                </div>

                <div className="flex justify-center mb-4">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="password" style={{ color: 'white' }}>Mot de passe</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <IconButton
                                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>

                            }
                            label="Mot de passe"
                            style={{ color: 'white' }}
                        />
                    </FormControl>
                </div>
                <div className="flex mb-4">
                    <p className="text-white">Rester connecté ? <Switch
                        {...label}
                        defaultChecked
                        onChange={(e) => setIsStayConnectedToggle(e.target.checked)}
                    />
                    </p>
                </div>
                <Button variant="outlined" className="w-full rounded" type="submit">
                    Se connecter
                </Button>
            </form>
            <Button
                variant="outlined"
                className="w-full rounded"
                sx={{ mt: 2 }}
                onClick={nagigateRegisterPage}
            >
                Créer un compte
            </Button>

        </div>
    );
}

export default Formulaire;
