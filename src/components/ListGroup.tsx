import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface ListItem {
  text: string;
  icon: any;
  link: string;
}

interface ListGroupProps {
  items: ListItem[];
  logo: string;
  isMenuCollapsed: boolean;
}

const ListGroup: React.FC<ListGroupProps> = ({ items, logo, isMenuCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleClick = (item: ListItem) => {
    navigate(item.link);
  };

  return (
    <>
      <div className="logo-container">
        <Link to="/" className="goHome">
          <img className="logo" src={logo} alt="User" />
        </Link>
        <div className="logo-spacer"></div>
      </div>
      <div className="logo-container2">
        <a href="/" className="goHome">
          <img
            className="logo"
            src="https://github.com/saif0133/website-deployment/blob/main/imgs/hublogo1.png?raw=true"
            alt="User"
          />
        </a>
      </div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className={`list-group-item ${location.pathname === item.link ? 'active' : ''}`}
            key={item.text}
            onClick={() => handleClick(item)}
          >
            <div className="Men">
              <div className="iconMenu">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              {!isMenuCollapsed && (
                <div className={`TextMen ${isMenuCollapsed ? "collapsed" : ""}`}>
                  {item.text}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
