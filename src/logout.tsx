import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import removeToken from "./final project/login-signup page/script.js";

const handleLogout = () => {
  localStorage.removeItem("authToken"); // Remove the token from localStorage
};

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
