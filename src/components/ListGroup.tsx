import React, { useState } from "react";
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
}

const ListGroup: React.FC<ListGroupProps> = ({ items, logo }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleClick = (item: ListItem) => {
    navigate(item.link);
    setSelectedItem(item.text);
  };

  return (
    <div className="hideme" id="hideme">
      <div className="logo-container">
        <a href="/" className="goHome">
          {" "}
          <img className="logo" src={logo} alt="User" />
        </a>
        <div className="logo-spacer"></div>
      </div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            className={
              selectedItem === item.text
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item.text}
            onClick={() => handleClick(item)}
          >
            <FontAwesomeIcon icon={item.icon} /> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
