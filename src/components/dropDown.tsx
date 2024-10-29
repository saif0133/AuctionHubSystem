import React from "react";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomIcon from "./customIcon";

// Define the type for user data
interface User {
  name: string;
  bid: number;
  pic: string;
}

interface DropdownComponentProps {
  users: User[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ users }) => {
  // Sort users by bid amount in descending order
  const sortedUsers = [...users].sort((a, b) => b.bid - a.bid);

  // Find the user with the highest bid
  const highestBidder = sortedUsers[0];

  // Create menu items based on the sorted user data
  const menu = (
    <Menu
      items={sortedUsers.map((user) => ({
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
              src={user.pic}
              alt={user.name}
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
        onClick: () => message.info(`${user.name}'s bid`),
        ...(user.bid === highestBidder.bid ? { disabled: false } : {}),
      }))}
    />
  );

  return (
    <Dropdown overlay={menu}>
      <Button>
        <img
          src={highestBidder.pic}
          alt={highestBidder.name}
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        {`${highestBidder.name} - ${highestBidder.bid} JDs`} <CustomIcon />
      </Button>
    </Dropdown>
  );
};

export default DropdownComponent;
