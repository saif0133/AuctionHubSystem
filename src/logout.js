import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
};
const Logout = () => {
    const navigate = useNavigate();
    navigate("/");
    //window.location.reload();
    useEffect(() => {
        handleLogout();
        localStorage.removeItem("authToken"); // Remove the token from localStorage
        navigate("/");
    }, []);
    return null;
};
export default Logout;
