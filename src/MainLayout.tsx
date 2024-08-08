import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import UserBar from "./UserBar";

const MainLayout = () => {
  const location = useLocation();
  const showMenu = location.pathname !== "/All";

  return (
    <>
      {showMenu && <Menu />}
      <UserBar />
      <div className="container">
        <Outlet /> {/* Renders the main content based on the route */}
      </div>
    </>
  );
};

export default MainLayout;
