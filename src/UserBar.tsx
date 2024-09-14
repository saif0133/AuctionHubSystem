import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
/*import {
  userToken,
  toggleForms,
  toggleFlexDirection,
  goHome,
  verifyLogin,
  removeToken,
} from "./final project/login-signup page/script.js";
*/
import { extractDataFromToken } from "./components/tokenDecode"
import { DecodedToken } from './components/tokenDecode';

interface UserInfo {
  name: string;
  pic: string;
}

function UserBar() {
  
  const [Info, setInfo] = useState<UserInfo | null>(null);
  const token = localStorage.getItem("authToken");
  /*useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://mocki.io/v1/b15b139b-66be-4bbb-8b89-b3940020b8ba`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token
              "Content-Type": "application/json", // If you're dealing with JSON data
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: UserInfo = await response.json();
        setInfo(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProduct();
  }, [token]); // Add token to dependency array

*/
  const [userData, setUserData] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const data = extractDataFromToken(token);
    setUserData(data);
  }, []);

   if (!userData) {
    return (
      <div className="testbar">
        <TopBar
          Name={ undefined}
          image={ undefined}
        />
      </div>
    );
   }

  return (
    <div className="testbar">
      <TopBar
        Name={ userData.firstName}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s"
      />
    </div>
  );
}

export default UserBar;
