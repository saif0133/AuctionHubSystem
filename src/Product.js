import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import PopupMMessage from "./components/PopupMessage";
const minBid = 100;
function Product() {
    let [Amount, setAmount] = useState(0);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const userPayment = true;
    // Fetch product data when component mounts or id changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://mocki.io/v1/181c6318-2259-463a-a14d-24facb1df32c`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            }
            catch (error) {
                console.error("Failed to fetch product data:", error);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);
    const openPopup = (event) => {
        event.preventDefault();
        const elements = document.getElementsByClassName("input__field");
        var bidValue = 0;
        if (elements.length > 0) {
            const inputElement = elements[0];
            bidValue = Number(inputElement.value);
            setAmount(bidValue);
        }
        if (bidValue < minBid) {
            alert(`${bidValue} is not acceptable, min available bid is ${minBid}`);
        }
        else {
            setIsPopupOpen(true);
        }
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const order = () => {
        return userPayment ? "bidFees" : "noPayment";
    };
    return (_jsx("div", { className: "testmain", children: _jsx("div", { className: "prod", children: product ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "owner", children: [_jsx("div", { className: "owner-pic", style: { backgroundImage: `url(${product.owner.pic})` } }), _jsx("div", { className: "owner-name", children: _jsx("h2", { children: product.owner.name }) })] }), _jsxs("div", { className: "product-info", children: [_jsxs("div", { className: "left", children: [_jsx("div", { className: "first-pic", style: { backgroundImage: `url(${product.images[0]})` } }), _jsx("div", { className: "additional-pics", children: product.images.slice(1).map((image, index) => (_jsx("div", { className: `pic-${index + 1} pro-pic`, style: { backgroundImage: `url(${image})` } }, index))) }), _jsxs("div", { className: "form", children: [_jsx("div", { className: "saif ssa", children: _jsxs("label", { className: "input", children: [_jsx("input", { className: "input__field", type: "text", placeholder: " " }), _jsx("span", { className: "input__label", children: "Bid Amount" })] }) }), _jsxs("div", { className: "note", children: ["Min available bid is : ", minBid, " $"] }), _jsx("button", { type: "submit", className: "btn-secondary btn bid", onClick: openPopup, children: "Bid" }), isPopupOpen && (_jsx(PopupMMessage, { closePopup: closePopup, order: order(), amount: Amount }))] })] }), _jsx("div", { className: "right" })] })] })) : (_jsxs("div", { className: "testmain", children: [_jsx("h1", { children: "Loading Product Data..." }), " "] })) }) }));
}
export default Product;
