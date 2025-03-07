import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../../shared/store/authSlice.js";
import { showToastError } from "../../../shared/utils/Toast.jsx"
import { ToastContainer } from "react-toastify";

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Switch from '@mui/material/Switch';

function FormRegister() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState({
        identique: false,
        taille: false,
        majuscule: false,
        chiffre: false,
        caractere_special: false,
        email: false,
    });

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();
    const isFormValid = Object.values(validations).every(Boolean);
    const [isStayConnectedToggle, setIsStayConnectedToggle] = useState(true);
    const isConnected = useSelector((state) => state.auth.isConnected);

    useEffect(() => {
        if (isConnected) {
            navigate('/');
        }
    }, [isConnected, navigate]);

    useEffect(() => {
        setValidations({
            taille: password.length >= 9,
            majuscule: /[A-Z]/.test(password),
            chiffre: /\d/.test(password),
            caractere_special: /[\W_]/.test(password),
            identique: password.length > 0 && password === passwordCheck,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        });
    }, [password, passwordCheck, email]);

    const navigateLoginPage = () => {
        navigate("/login");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid) {
            showToastError("Veuillez respecter les règles données pour le mot de passe et l'email. :)");
            return;
        }

        try {
            await dispatch(postRegister({ email, password, isStayConnectedToggle }));;
            // window.location.reload();
        } catch (error) {
        }
    };


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
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        sx={{ color: 'white' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mot de passe"
                            style={{ color: 'white' }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel htmlFor="passwordCheck" style={{ color: 'white' }}>Confirmer le mot de passe</InputLabel>
                        <OutlinedInput
                            id="passwordCheck"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirmer le mot de passe"
                            style={{ color: 'white' }}
                        />
                    </FormControl>
                </div>
                <div className="flex mb-4">
                    <div className="flex mb-4">
                        <p className="text-white">Rester connecté ? <Switch
                            {...label}
                            defaultChecked
                            onChange={(e) => setIsStayConnectedToggle(e.target.checked)}
                        />
                        </p>
                    </div>
                </div>
                <ul className="text-white text-center m-3">
                    {Object.entries(validations).map(([key, isValid]) => (
                        <li key={key} id={key} className={isValid ? 'text-green-500' : 'text-red-500'}>
                            {key === 'identique' && 'Les mots de passe sont identiques.'}
                            {key === 'email' && 'Le mail a pour forme name@adresse.com  '}
                            {key === 'taille' && 'Strictement plus de 8 caractères.'}
                            {key === 'majuscule' && 'Au moins une majuscule.'}
                            {key === 'chiffre' && 'Au moins un chiffre.'}
                            {key === 'caractere_special' && 'Au moins un caractère spécial.'}
                        </li>
                    ))}
                </ul>
                <Button
                    variant="outlined"
                    className="w-full rounded"
                    type="submit"

                >
                    Créer le compte !
                </Button>
            </form>
            <Button variant="outlined" className="w-full rounded" sx={{ mt: 2 }} onClick={navigateLoginPage}>
                Se connecter
            </Button>
        </div>
    );
}

export default FormRegister;