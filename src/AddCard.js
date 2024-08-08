import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./AddCard.css";
const cardLogos = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png",
    mastercard: "https://pngimg.com/uploads/mastercard/mastercard_PNG15.png",
    discover: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Discover_Card_logo.svg/2560px-Discover_Card_logo.svg.png",
    dinersclub: "https://iconape.com/wp-content/png_logo_vector/diners-club-logo3.png",
    jcb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/2560px-JCB_logo.svg.png",
    amex: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo_%282018%29.svg/2560px-American_Express_logo_%282018%29.svg.png",
    unknown: "",
};
const getCardType = (number) => {
    const sanitizedNumber = number.replace(/\s/g, "");
    const prefix = sanitizedNumber.slice(0, 6);
    if (/^4/.test(sanitizedNumber))
        return "visa";
    if (/^5[1-5]/.test(sanitizedNumber) || /^2[2-7]/.test(prefix))
        return "mastercard";
    if (/^3[47]/.test(sanitizedNumber))
        return "amex";
    if (/^6(?:011|5)/.test(sanitizedNumber) ||
        /^64[4-9]/.test(sanitizedNumber) ||
        /^622(?:12[6-9]|1[3-9]|[2-8][0-9]|9[01]|92[0-5])/.test(prefix))
        return "discover";
    if (/^3(?:0[0-5]|[68])/.test(sanitizedNumber))
        return "dinersclub";
    if (/^35(?:2[89]|[3-8][0-9])/.test(prefix))
        return "jcb";
    return "unknown";
};
const AddCard = () => {
    const [cardNumber, setCardNumber] = useState("**** **** **** ****");
    const [cardName, setCardName] = useState("FULL NAME");
    const [cardExpiry, setCardExpiry] = useState("MM/YY");
    const [cardCVC, setCardCVC] = useState("CVC");
    const [cardType, setCardType] = useState("unknown");
    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        value = value
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
        setCardNumber(value);
        setCardType(getCardType(value));
    };
    const handleCardNameChange = (e) => {
        setCardName(e.target.value.toUpperCase());
    };
    const handleCardExpiryChange = (e) => {
        let value = e.target.value;
        value = value
            .replace(/\s/g, "")
            .replace(/(\d{2})(\d{2})/, "$1/$2")
            .trim();
        setCardExpiry(value);
    };
    const handleCardCVCChange = (e) => {
        setCardCVC(e.target.value);
    };
    return (_jsxs("div", { className: "add-card-container", children: [_jsx("div", { className: "credit-card", children: _jsxs("div", { className: "credit-card-content", children: [_jsx("div", { className: "credit-card-logo", children: cardType !== "unknown" && (_jsx("img", { src: cardLogos[cardType], alt: cardType, className: "card-logo" })) }), _jsx("div", { className: "credit-card-chip" }), _jsx("div", { className: "credit-card-number", children: cardNumber }), _jsx("div", { className: "credit-card-name", children: cardName }), _jsx("div", { className: "credit-card-expiry", children: cardExpiry }), _jsx("div", { className: "credit-card-cvc", children: cardCVC })] }) }), _jsxs("div", { className: "form-container", children: [_jsxs("div", { className: "field-container", children: [_jsx("label", { htmlFor: "name", children: "Name" }), _jsx("input", { id: "name", type: "text", maxLength: 20, placeholder: "FULL NAME", onChange: handleCardNameChange })] }), _jsxs("div", { className: "field-container", children: [_jsx("label", { htmlFor: "cardnumber", children: "Card Number" }), _jsx("input", { id: "cardnumber", type: "text", pattern: "[0-9]*", inputMode: "numeric", maxLength: 19, placeholder: "**** **** **** ****", onChange: handleCardNumberChange })] }), _jsxs("div", { className: "field-container", children: [_jsx("label", { htmlFor: "expirationdate", children: "Expiration (MM/YY)" }), _jsx("input", { id: "expirationdate", type: "text", pattern: "[0-9]*", inputMode: "numeric", maxLength: 4, placeholder: "MM/YY", onChange: handleCardExpiryChange })] }), _jsxs("div", { className: "field-container", children: [_jsx("label", { htmlFor: "securitycode", children: "Security Code (CVC)" }), _jsx("input", { id: "securitycode", type: "text", pattern: "[0-9]*", inputMode: "numeric", maxLength: 3, placeholder: "CVC", onChange: handleCardCVCChange })] }), _jsx("button", { type: "button", className: "btn btn-primary submit", children: "Submit" })] })] }));
};
export default AddCard;
