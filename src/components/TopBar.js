import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
function TopBar({ Name, image }) {
    let [searchInput, setSearchInput] = useState("");
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };
    const handleKeyDown = (event) => {
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
        return (_jsxs("div", { className: "Top-Bar", children: [_jsxs("div", { className: "search", children: [_jsx("input", { type: "text", placeholder: "Search...", className: "Search-Input search-a", value: searchInput, onChange: handleSearchInputChange, onKeyDown: handleKeyDown }), _jsx(Button, { icon: faSearch, onClick2: handleSearchClick })] }), _jsxs("div", { className: "user-info", children: [_jsxs("h1", { className: "User-Name", children: ["Hi, ", Name] }), _jsx("img", { className: "User-Profile-Pic", src: image || "", alt: "User" })] })] }));
    }
    else {
        return (_jsxs("div", { className: "Top-Bar", children: [_jsxs("div", { className: "search", children: [_jsx("input", { type: "text", placeholder: "Search...", className: "Search-Input search-a", value: searchInput, onChange: handleSearchInputChange }), _jsx(Button, { icon: faSearch, onClick2: handleSearchClick })] }), _jsxs("div", { className: "info", children: [_jsx("h1", { className: "logIn", children: _jsx("a", { href: "../src/final project/login-signup page/login.html", children: "Log In" }) }), _jsx("h1", { className: "SignUp", children: _jsx("a", { href: "../src/final project/login-signup page/login.html", children: "Sign up" }) })] })] }));
    }
}
export default TopBar;
