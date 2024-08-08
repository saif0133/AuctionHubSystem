import React from "react";
import {
  faHome,
  faPlus,
  faGavel,
  faMoneyBillWave,
  faCreditCard,
  faQuestionCircle,
  faInfoCircle,
  faPhone,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import ListGroup from "./components/ListGroup";

interface ListItem {
  text: string;
  icon: any;
  link: string;
}

const userName = "Saif";
const userProfile =
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg";

const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";

function Menu() {
  const token = localStorage.getItem("authToken"); // Check if the token exists

  let items: ListItem[] = [
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

  return (
    <div className="menu">
      <ListGroup items={items} logo={logo} />
      <div className="footer">
        <p>
          <a href="legal.html">Legal</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <a href="privacy.html">Privacy Policy</a>
        </p>
        <p>© 2024 Auction Hub. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Menu;
