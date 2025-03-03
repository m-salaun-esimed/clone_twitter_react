import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setIsConnected } from "../store/authSlice";

const AuthGuard = ( Children ) => {
  const Auth = (props) => {
    const token = useSelector((state) => state.auth.token);
    const isConnected = useSelector((state) => state.auth.isConnected);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      if(!token){
        console.log("redirect login :")
        dispatch(setIsConnected(false));
        navigate("/login");
        return;
      }

      dispatch(setIsConnected(true));
    }, []);

    return isConnected ? <Children {...props}/> : null; //TODO component chargement 
  };

  return Auth;
};

export default AuthGuard;