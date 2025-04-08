import React from "react";
import SplashScreen from "./SplashScreen";
import { onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { AuthContext } from "./App";

function Redirecto() {
  const { userId, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setLoading(false);
      navigate("/home");
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, []);
  if (loading) {
    return <SplashScreen />;
  }
}

export default Redirecto;
