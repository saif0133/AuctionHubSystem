import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function ProductCard({ img, title, description, currentPrice, endDate, id, message, }) {
    const [timeLeft, setTimeLeft] = useState("");
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/Product/${id}`);
        console.log("card id is " + id);
    };
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = endDate.getTime() - now.getTime();
            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
            }
            else {
                setTimeLeft(String(message));
            }
        };
        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [endDate]);
    return (_jsx("div", { className: "products", children: _jsxs("div", { className: "card", onClick: () => handleClick(id), children: [_jsx("img", { src: img }), _jsx("div", { className: "product-title", children: title }), _jsx("div", { className: "product-description", children: description }), _jsxs("div", { className: "product-current-price", children: [currentPrice, " JDs"] }), _jsx("div", { className: `product-count-down ${message === "time out" ? "" : "win"}`, children: timeLeft })] }) }));
}
export default ProductCard;
