import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
function UserBar() {
    const [Info, setInfo] = useState(null);
    const token = localStorage.getItem("authToken");
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://mocki.io/v1/b15b139b-66be-4bbb-8b89-b3940020b8ba`, {
                    method: "Get",
                    headers: {
                        // Authorization: `Bearer ${token}`, // Include the token
                        "Content-Type": "application/json", // If you're dealing with JSON data
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setInfo(data);
            }
            catch (error) {
                console.error("Failed to fetch product data:", error);
            }
        };
        fetchProduct();
    }, []);
    return (_jsx("div", { className: "testbar", children: _jsx(TopBar, { Name: token ? Info?.name : undefined, image: token ? Info?.pic : undefined }) }));
}
export default UserBar;
