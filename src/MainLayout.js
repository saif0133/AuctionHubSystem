import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import Menu from "./Menu";
import UserBar from "./UserBar";
const MainLayout = () => {
    const location = useLocation();
    const showMenu = location.pathname !== "/All";
    return (_jsxs(_Fragment, { children: [showMenu && _jsx(Menu, {}), _jsx(UserBar, {}), _jsxs("div", { className: "container", children: [_jsx(Outlet, {}), " "] })] }));
};
export default MainLayout;
