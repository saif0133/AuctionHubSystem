import React, { useState } from "react";
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

const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";

function Menu() {
  const [isMenuVisible, setIsMenuVisible] = useState(true); // Manage visibility
  const [menuHeight, setMenuHeight] = useState('100%'); // Manage height
  const [menuClass, setMenuClass] = useState(''); // Manage menu class
  const token = localStorage.getItem("authToken"); // Check if the token exists

  // let items: ListItem[] = [
  //   { text: "Home", icon: faHome, link: "/" },
  //   { text: "Add Auction", icon: faPlus, link: "/Add-Auction" },
  //   { text: "My Auction", icon: faGavel, link: "/My-Auction" },
  //   { text: "My bids", icon: faMoneyBillWave, link: "/My-bids" },
  //   { text: "Payment", icon: faCreditCard, link: "/Payment" },
  //   { text: "Help", icon: faQuestionCircle, link: "/Help" },
  //   { text: "About Us", icon: faInfoCircle, link: "/About-Us" },
  //   { text: "Contact Us", icon: faPhone, link: "/Contact-Us" },
  // ];
  let items: ListItem[] = localStorage.getItem("authToken")
  ? [
      { text: "Home", icon: faHome, link: "/" },
      { text: "Add Auction", icon: faPlus, link: "/Add-Auction" },
      { text: "My Auction", icon: faGavel, link: "/My-Auction" },
      { text: "My bids", icon: faMoneyBillWave, link: "/My-bids" },
      { text: "Payment", icon: faCreditCard, link: "/Payment" },
      { text: "Help", icon: faQuestionCircle, link: "/Help" },
      { text: "About Us", icon: faInfoCircle, link: "/About-Us" },
      { text: "Contact Us", icon: faPhone, link: "/Contact-Us" },
    ]
  : [
      { text: "Home", icon: faHome, link: "/" },
      { text: "Help", icon: faQuestionCircle, link: "/Help" },
      { text: "About Us", icon: faInfoCircle, link: "/About-Us" },
      { text: "Contact Us", icon: faPhone, link: "/Contact-Us" },
    ];


  if (token) {
    items.push({ text: "Logout", icon: faSignOutAlt, link: "/Logout" });
  }
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(() => {
    const storedValue = localStorage.getItem("menu");
    return storedValue ? JSON.parse(storedValue) : true; // Default to true if no value is found
  });
  
  const toggleMenuCollapse = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
    localStorage.setItem("menu",(!isMenuCollapsed).toString());
  };

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev); // Toggle visibility
    setMenuHeight(prev => prev === '100%' ? '2%' : '100%'); // Toggle height
    setMenuClass(prev => prev === '' ? 'menu-hidden' : ''); // Toggle class
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
    {/* <div className="menicon" onClick={toggleMenu}>
      ☰
    </div> */}
    <div
      className={`menu ${isMenuCollapsed ? "collapsed" : ""}`}
    >
      <div className="small">
        <i
          className="bi bi-arrow-left-circle-fill"
          onClick={toggleMenuCollapse}
          style={{ float: "right", cursor: "pointer" }}
        ></i>
      </div>
     
        <>
            <ListGroup items={items} logo={logo} isMenuCollapsed={isMenuCollapsed} />
          <div className="footer">
            <p>
              <a href="legal.html">Legal</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="privacy.html">Privacy Policy</a>
            </p>
            <p>© 2024 Auction Hub. All Rights Reserved.</p>
          </div>
        </>
      
    </div>
  </>
  );
}

export default Menu;
