import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faHome, faPlus, faGavel, faMoneyBillWave, faCreditCard, faQuestionCircle, faInfoCircle, faPhone, faSignOutAlt, } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "./components/ListGroup";
const userName = "Saif";
const userProfile = "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg";
const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";
function Menu() {
    const token = localStorage.getItem("authToken"); // Check if the token exists
    let items = [
        { text: "Home", icon: faHome, link: "/" },
        { text: "Add Auction", icon: faPlus, link: "/Add-Auction" },
        { text: "My Auction", icon: faGavel, link: "/My-Auction" },
        { text: "My bids", icon: faMoneyBillWave, link: "/My-bids" },
        { text: "Payment", icon: faCreditCard, link: "/Payment" },
        { text: "Help", icon: faQuestionCircle, link: "/Help" },
        { text: "About Us", icon: faInfoCircle, link: "/About-Us" },
        { text: "Contact Us", icon: faPhone, link: "/Contact-Us" },
    ];
    if (token) {
        items.push({ text: "Logout", icon: faSignOutAlt, link: "/Logout" });
    }
    return (_jsxs("div", { className: "menu", children: [_jsx(ListGroup, { items: items, logo: logo }), _jsxs("div", { className: "footer", children: [_jsxs("p", { children: [_jsx("a", { href: "legal.html", children: "Legal" }), " \u00A0\u00A0\u00A0\u00A0\u00A0", " ", _jsx("a", { href: "privacy.html", children: "Privacy Policy" })] }), _jsx("p", { children: "\u00A9 2024 Auction Hub. All Rights Reserved." })] })] }));
}
export default Menu;
