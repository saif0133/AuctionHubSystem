import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./popupsStyle.css";
import noPayment from "./noPayment";
import publishFees from "./publishFees";
import BidFees from "./bidFees";
function PopupMMessage({ closePopup, order, amount }) {
    const nopay = () => {
        return noPayment;
    };
    const outsideClick = (event) => {
        if (event.target.className === "popup") {
            closePopup();
        }
    };
    if (order === "noPayment")
        return (_jsx("div", { children: _jsx("div", { id: "popupBox", className: "popup", onClick: outsideClick, children: _jsx("div", { className: "popup-content", children: noPayment() }) }) }));
    else if (order === "publishFees")
        return (_jsx("div", { children: _jsx("div", { id: "popupBox", className: "popup", onClick: outsideClick, children: _jsx("div", { className: "popup-content", children: publishFees() }) }) }));
    else if (order === "bidFees")
        return (_jsx("div", { children: _jsxs("div", { id: "popupBox", className: "popup", onClick: outsideClick, children: [_jsx("div", { className: "popup-content", children: _jsx(BidFees, { amount: amount, closePopup: closePopup }) }), " "] }) }));
    else
        return null;
}
export default PopupMMessage;
