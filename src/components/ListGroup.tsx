import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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

  const handleClick = (item: ListItem) => {
    navigate(item.link);
  };

  return (
    <>
      <div className="logo-container">
        <a href="/" className="goHome">
          <img className="logo" src={logo} alt="User" />
        </a>
        <div className="logo-spacer"></div>
      </div>
      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item.text} onClick={() => handleClick(item)}>
            <div className="Men">
              <div className="iconMenu">
                <FontAwesomeIcon icon={item.icon} />
              </div>
             
                {!isMenuCollapsed && (
                   <div className={`TextMen ${isMenuCollapsed ? "collapsed" : ""}`} >
                  
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
