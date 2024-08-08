import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

interface TopBarProp {
  Name: string | undefined;
  image: string | undefined;
}

function TopBar({ Name, image }: TopBarProp) {
  let [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default action (like form submission)
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (!searchInput.trim()) {
      alert("Please enter a search query");
      return;
    }
    console.log("Search input:", searchInput);
    setSearchInput("");
  };
  if (Name) {
    return (
      <div className="Top-Bar">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="Search-Input search-a"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button icon={faSearch} onClick2={handleSearchClick}></Button>
        </div>
        <div className="user-info">
          <h1 className="User-Name">Hi, {Name}</h1>
          <img className="User-Profile-Pic" src={image || ""} alt="User" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="Top-Bar">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            className="Search-Input search-a"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <Button icon={faSearch} onClick2={handleSearchClick}></Button>
        </div>
        <div className="info">
          <h1 className="logIn">
            <a href="../src/final project/login-signup page/login.html">
              Log In
            </a>
          </h1>
          <h1 className="SignUp">
            <a href="../src/final project/login-signup page/login.html">
              Sign up
            </a>
          </h1>
        </div>
      </div>
    );
  }
}

export default TopBar;
