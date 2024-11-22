import React, { useState } from "react";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomIcon from "./customIcon";
import PopupMMessage from "./PopupMessage";
import { faL } from "@fortawesome/free-solid-svg-icons";

// Define the type for user data
interface User {
  name: string;
  userID: number;
  bid: number;
  pic: string;
  id: number;
}

interface DropdownComponentProps {
  users: User[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ users }) => {
  // Sort users by bid amount in descending order
  const sortedUsers = [...users].sort((a, b) => b.bid - a.bid);

  // Find the user with the highest bid if there is one
  const highestBidder = sortedUsers.length > 0 ? sortedUsers[0] : null;

  const [isPopupOpen,setIsPopupOpen]=useState(false);
  const [Id,setID]=useState(0);

  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const deleteBid = async (bidID: number) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`http://localhost:8080/bid/delete/${bidID}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
        });

      if (!response.ok) {
        message.info(response.status);
        closePopup();

        throw new Error(`HTTP error! Status: ${response.status}`);
        

      }

      closePopup();



    } catch (error) {
      closePopup();

      console.error('Failed to fetch categories:', error);

    }
  };




  // Create menu items based on the sorted user data
  const menu = (
    <Menu
      items={
        sortedUsers.length > 0
          ? sortedUsers.map((user) => ({
            key: user.name,
            label: (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={user.pic || "https://via.placeholder.com/40"}
                  alt={user.name || "User"}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                />
                <span>{`${user.name} - ${user.bid} JDs`}</span>
                
              </div>
            ),
            onClick: () => {
              message.info(`${user.name}'s bid with id ${user.id} and user id is ${user.userID}`)
              setID(user.id);
setIsPopupOpen(true);
             // deleteBid(user.id);
            },
            ...(user.bid === highestBidder?.bid ? { disabled: false } : {}),
          }))
          : [{ key: "no-bids", label: "No bids available" }]
      }
    />
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <Button>
          <img
            src={
              highestBidder
                ? highestBidder.pic
                : "https://media.lordicon.com/icons/wired/outline/1657-alert.gif"
            }
            alt={highestBidder?.name || "No Bids"}
            style={{ width: 30, height: 30, borderRadius: "50%" }}
          />
          {highestBidder
            ? `${highestBidder.name} - ${highestBidder.bid} JDs`
            : "No Bids Until Now"}{" "}
          <CustomIcon />
        </Button>
      </Dropdown>

      {isPopupOpen && (
      <PopupMMessage
        closePopup={closePopup}
        order={"RemoveFees"}
        amount={""}
        description={"FREE"}
        customFunction={() => deleteBid(Id)} // Wrap in a function
      />)}

    </>
  );
};

export default DropdownComponent;
