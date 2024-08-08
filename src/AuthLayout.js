import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
    return (_jsxs("div", { className: "auth-layout", children: [_jsx(Outlet, {}), " "] }));
};
export default AuthLayout;
