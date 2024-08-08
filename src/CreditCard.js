import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
let a = 0;
const number = 4444;
const name = "Saif Reda Alsaeed Alsaied";
const date = "12 / 24";
function CrediCard() {
    const navigate = useNavigate();
    const add = () => {
        navigate("/AddCard");
    };
    if (a === 1) {
        return (_jsx("div", { className: "testmain", children: _jsxs("div", { className: "credit-card card", children: [_jsx("div", { className: "credit-card-chip" }), _jsxs("div", { className: "credit-card-number", children: ["**** **** **** ", number] }), _jsx("div", { className: "credit-card-name", children: name }), _jsx("div", { className: "credit-card-expiry", children: date }), _jsx("div", { className: "credit-card-logo", children: "VISA" })] }) }));
    }
    else {
        return (_jsx("a", { onClick: add, target: "_blank", className: "addNewCard", children: _jsx("div", { className: "testmain", children: _jsxs("div", { className: "credit-card card add-card", children: [_jsx("div", { className: "addCard", children: "+" }), _jsx("div", { className: "addCardTxt", children: "Add Payment Method" })] }) }) }));
    }
}
export default CrediCard;
