import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setIsConnected } from "../store/authSlice";
import { checkTokenValidity } from "../../domains/user/user";

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.userId);
    const isConnected = useSelector((state) => state.auth.isConnected);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const verifyToken = async () => {
        const isValid = await checkTokenValidity(token, userId);
        if (!isValid) {
          console.log("❌ Token invalide, redirection vers /login");
          dispatch(setIsConnected(false));
          navigate("/login");
        } else {
          dispatch(setIsConnected(true));
        }
      };

      verifyToken();
    }, [token, userId, dispatch, navigate]);

    return isConnected ? <WrappedComponent {...props} /> : null;
  };
};

export default AuthGuard;
