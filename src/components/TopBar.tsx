import React, { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import UploadComponent from "./uploadImage";
import { useNavigate } from "react-router-dom";

interface TopBarProp {
  FirestName: string | undefined;
  LastName: string | undefined;
  UserEmail: string | undefined;
  image: string | undefined;
}

function TopBar({ FirestName, LastName, UserEmail, image }: TopBarProp) {
  const [searchInput, setSearchInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(FirestName || "");
  const [lastName, setLastName] = useState(LastName || "");
  const [email, setEmail] = useState(UserEmail);
  const [profileImage, setProfileImage] = useState(image || "");
  const [file, setFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState<string>(image || "");
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const navigate = useNavigate();
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
    //navigate(`/all?searchKey=${searchInput}`);
    window.location.href = `/all?searchKey=${searchInput}`;
    console.log("Search input:", searchInput);
    setSearchInput("");
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {


    setEditMode(false);
    setImageLink(image?image:"");
    setFirstName(FirestName?FirestName:"");
    setLastName(LastName?LastName:"");
  };

  const handleLogout = () => {
    window.location.href = '/Logout';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = (url: string) => {
    setImageLink(url);
    setProfileImage(url);
    console.log(url);
  };


  const updateAccount = async () => {
    const url = "http://localhost:8080/update-account";
    const token = localStorage.getItem("authToken"); // Replace with the actual token

    const body = {
      firstName: firstName,
      lastName: lastName,
      profileImage: {
        name: "Profile image",
        type: "png",
        imageUrl: imageLink ? imageLink : image,
      },
    };

    console.log(JSON.stringify(body, null, 2));

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      // Check if response has content
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        localStorage.removeItem("authToken");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Account updated:", data);
        } else {
          console.log("Account updated, no JSON returned.");
          const newToken = await response.text(); // Get the new token as text
          console.log(newToken);


          // Correctly call window.location.reload

          localStorage.setItem("authToken", newToken);

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      } else {
        console.error("Failed to update account:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    setFirstName(FirestName || '');
    setLastName(LastName || '');
  }, [FirestName, LastName]); // Watch for changes to props
  if (!FirestName) {
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
            <a href="./login.html">Sign up</a>
          </h1>
        </div>
      </div>
    )
  }
  else {
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
          <Button icon={faSearch} onClick2={handleSearchClick} />
        </div>
        <div className="user-info">
          <h1 className="User-Name">Hi, {FirestName}</h1>
          <div className="user-profile">
            <img
              className="User-Profile-Pic"
              src={image}
              alt="User"
              onClick={() => document.getElementById('fileInput')?.click()}
            />

          </div>

          <div className="user-info-box">
            <div className="user-box">
              {editMode ? (
                <>
                  <span className="color"></span>

                  <img
                    className="User-Profile-Pic"
                    src={imageLink ? imageLink : image}
                    alt="User"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {file && (
                    <UploadComponent
                      file={file}
                      onUpload={handleUpload}
                    />
                  )}

                  <div className="inpa">
                  <input
                    className="inputk"
                    type="text"
                    value={firstName || ''}
                    onChange={(e) => setFirstName(e.target.value)} // Update state on input change
                    placeholder="First Name"
                  />
                  <input
                    className="inputk"
                    type="text"
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.target.value)} // Update state on input change
                    placeholder="Last Name"
                  /></div>
                  <input
                    className="inputk forbidden"
                    type="text"
                    value={UserEmail || ''}
                    readOnly
                    placeholder="Email"
                  />
                  <div className="buttons">
                    <button onClick={updateAccount} className="btn btn-success">Save</button>
                    <button onClick={handleCancel} className="btn btn-danger">Cancel</button>
                  </div>
                </>
              ) : (
                <div className="userInfoBar">
                  <span className="color"></span>
                  <img
                    className="User-Profile-Pic"
                    src={imageLink ? imageLink : image}
                    alt="User"

                  />
                  <p className="inputk">{FirestName} {LastName}</p>
                  <p className="inputk">{UserEmail}</p>
                  <div className="buttons">
                    <button onClick={() => setEditMode(true)} className="btn btn-success">Edit</button>
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default TopBar;
