import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
//import { token } from "./fetchContent";
import userToken from "./final project/login-signup page/script.js";

/*
const userName = "";
const userProfile =
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg";

*/
interface UserInfo {
  name: string;
  pic: string;
}

function UserBar() {
  const [Info, setInfo] = useState<UserInfo | null>(null);
  const token = localStorage.getItem("authToken") || userToken;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://mocki.io/v1/b15b139b-66be-4bbb-8b89-b3940020b8ba`,
          {
            method: "Get",
            headers: {
              // Authorization: `Bearer ${token}`, // Include the token
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
  }, []);

  return (
    <div className="testbar">
      <TopBar
        Name={token ? Info?.name : undefined}
        image={token ? Info?.pic : undefined}
      ></TopBar>
    </div>
  );
}

export default UserBar;
