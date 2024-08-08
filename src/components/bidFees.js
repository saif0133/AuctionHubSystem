import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./popUpContent.css";
const BidFees = ({ amount, closePopup }) => {
    return (_jsxs("div", { className: "popupMessage", children: [_jsx("div", { className: "caption-image", children: _jsx("img", { className: "imgc", src: "https://raw.githubusercontent.com/saif0133/deploy-sec/main/imgs/bid.png", alt: "Bid" }) }), _jsxs("div", { className: "caption", children: ["Are you sure you want to bid with amount: ", amount, "$ ?"] }), _jsxs("div", { className: "buttons", children: [_jsx("button", { className: "next back btn btn-danger popa", onClick: closePopup, children: "Cancel" }), _jsx("button", { className: "next back btn btn-success popa", children: "Accept and Bid" })] })] }));
};
export default BidFees;
