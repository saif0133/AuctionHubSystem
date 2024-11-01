import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import NotFound from "./notFound";
import VarifyEmail from "./VarifyEmail";
import ResetPassword from "./ResetPassword";
import JoinAuction from "./JoinedAuctions";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/verifyEmail') {
      import('./VarifyEmail.css');
    }
    else if (location.pathname === '/reset-password') {
      import('./ResetPassword.css');
    }
  }, [location.pathname]);

  const showMenu = location.pathname !== "/all";

  return (
    <>
      {showMenu && <Menu />}
      <UserBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/My-bids" element={<JoinAuction />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Add-Auction" element={<AddAuction />} />
        <Route path="/My-Auction" element={<MyAuction />} />
        <Route path="/Payment" element={<CreditCard />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AddCard" element={<AddCard />} />
        <Route path="/All" element={<AllProducts />} />
        <Route path="/verifyEmail" element={<VarifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
