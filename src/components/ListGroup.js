import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const ListGroup = ({ items, logo }) => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const handleClick = (item) => {
        navigate(item.link);
        setSelectedItem(item.text);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "logo-container", children: [_jsxs("a", { href: "/", className: "goHome", children: [" ", _jsx("img", { className: "logo", src: logo, alt: "User" })] }), _jsx("div", { className: "logo-spacer" })] }), _jsx("ul", { className: "list-group", children: items.map((item) => (_jsxs("li", { className: selectedItem === item.text
                        ? "list-group-item active"
                        : "list-group-item", onClick: () => handleClick(item), children: [_jsx(FontAwesomeIcon, { icon: item.icon }), " ", item.text] }, item.text))) })] }));
};
export default ListGroup;
