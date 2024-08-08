import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet /> {/* This renders the login page */}
    </div>
  );
};

export default AuthLayout;
