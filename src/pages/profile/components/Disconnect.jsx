import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { disconnect } from '../../../shared/store/authSlice';

function Disconnect() {
    const dispacth = useDispatch();

    const disconnectButton = () => {
        dispacth(disconnect());
        window.location.reload();
    };

    return (
        <Button color="error" variant="contained" onClick={disconnectButton}>
            Déconnexion
        </Button>
    )
}

export default Disconnect
