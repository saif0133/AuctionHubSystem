import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import UserBar from "./UserBar";
import MyAuction from "./MyAuction";
import AddAuction from "./AddAuction";
import AboutUs from "./AboutUs";
import CreditCard from "./CreditCard";
import ContactUs from "./ContactUs";
import AllProducts from "./AllProducts";
import AddCard from "./AddCard";
import Help from "./Help";
import Product from "./Product";
import NotImplemented from "./components/NotImpelmented";
import Logout from "./logout";
const App = () => {
    return (_jsx(Router, { children: _jsx(Layout, {}) }));
};
const Layout = () => {
    const location = useLocation();
    const showMenu = location.pathname !== "/All";
    return (_jsxs(_Fragment, { children: [showMenu && _jsx(Menu, {}), _jsx(UserBar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/My-bids", element: _jsx(NotImplemented, {}) }), _jsx(Route, { path: "/Product/:id", element: _jsx(Product, {}) }), _jsx(Route, { path: "/Add-Auction", element: _jsx(AddAuction, {}) }), _jsx(Route, { path: "/My-Auction", element: _jsx(MyAuction, {}) }), _jsx(Route, { path: "/Payment", element: _jsx(CreditCard, {}) }), _jsx(Route, { path: "/Help", element: _jsx(Help, {}) }), _jsx(Route, { path: "/About-Us", element: _jsx(AboutUs, {}) }), _jsx(Route, { path: "/Contact-Us", element: _jsx(ContactUs, {}) }), _jsx(Route, { path: "/Logout", element: _jsx(Logout, {}) }), _jsx(Route, { path: "/AddCard", element: _jsx(AddCard, {}) }), _jsx(Route, { path: "/All", element: _jsx(AllProducts, {}) })] })] }));
};
export default App;
