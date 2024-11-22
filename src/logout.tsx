// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// //import removeToken from "./final project/login-signup page/script.js";

// const handleLogout = () => {
//   localStorage.clear(); // Remove the token from localStorage
//   window.location.reload();
// };

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     handleLogout();
//     navigate("/");
//   }, [navigate]);

//   return null;
// };

// export default Logout;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import removeToken from "./final project/login-signup page/script.js";

const handleLogout = () => {
  localStorage.clear(); // Remove the token from localStorage
 // window.location.reload();
};
const Logout = () => {
  const navigate = useNavigate();

  localStorage.clear();
    //  window.location.reload();

    window.location.href="/"


  return null;
};

export default Logout;
