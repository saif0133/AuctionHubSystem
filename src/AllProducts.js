import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "./components/ListGroup";
import "./script";
function AllProducts() {
    const [fromValue, setFromValue] = useState(10);
    const [toValue, setToValue] = useState(1000);
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const [inpDay, setInpDay] = useState(day);
    const handleChange = (event) => {
        if (parseInt(event.target.value, 10) < 10 && event.target.value.length < 2)
            setInpDay("0" + event.target.value);
        else if (parseInt(event.target.value) >= 10 &&
            parseInt(event.target.value) < 32)
            setInpDay(event.target.value);
        else {
            setInpDay(day);
        }
    };
    const items = [{ text: "Home", icon: faHome, link: "/" }];
    const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";
    const handleFromInputChange = (e) => {
        const value = Number(e.target.value);
        if (value < toValue) {
            setFromValue(value);
        }
    };
    const handleToInputChange = (e) => {
        const value = Number(e.target.value);
        if (value > fromValue) {
            setToValue(value);
        }
    };
    // Function to update the slider background
    const updateSliderBackground = () => {
        const rangeDistance = 1000 - 10; // Adjust based on your slider range
        const fromPosition = ((fromValue - 10) / rangeDistance) * 100;
        const toPosition = ((toValue - 10) / rangeDistance) * 100;
        const sliders = document.querySelectorAll('.sliders_control input[type="range"]');
        sliders.forEach((slider) => {
            slider.style.background = `linear-gradient(
        to right,
        #C6C6C6 ${fromPosition}%,
        #740000 ${fromPosition}%,
        #740000 ${toPosition}%,
        #C6C6C6 ${toPosition}%
      )`;
        });
    };
    // Update slider background whenever the values change
    useEffect(() => {
        updateSliderBackground();
    }, [fromValue, toValue]);
    return (_jsxs("div", { className: "menu", children: [_jsx(ListGroup, { items: items, logo: logo }), _jsx("div", { className: "logo-container", children: _jsx("div", { className: "logo-spacer" }) }), _jsx("div", { className: "filter", children: "Filter" }), _jsxs("div", { className: "filter-container", children: [_jsxs("div", { className: "r_container list-group-item", children: [_jsx("div", { className: "range-title", children: "Price Range" }), _jsxs("div", { className: "sliders_control", children: [_jsx("input", { id: "fromSlider", type: "range", value: fromValue, min: "10", max: "1000", step: 10, onChange: (e) => {
                                            const value = Number(e.target.value);
                                            if (value <= toValue) {
                                                setFromValue(value);
                                            }
                                        } }), _jsx("input", { id: "toSlider", type: "range", value: toValue, min: "10", max: "1000", step: 10, onChange: (e) => {
                                            const value = Number(e.target.value);
                                            if (value >= fromValue) {
                                                setToValue(value);
                                            }
                                        } })] }), _jsxs("div", { className: "form_control", children: [_jsxs("div", { className: "form_control_container", children: [_jsx("div", { className: "form_control_container__time", children: "Min" }), _jsx("input", { className: "form_control_container__time__input", type: "number", id: "fromInput", value: fromValue, min: "10", max: toValue - 10, onChange: handleFromInputChange })] }), _jsxs("div", { className: "form_control_container", children: [_jsx("div", { className: "form_control_container__time", children: "Max" }), _jsx("input", { className: "form_control_container__time__input", type: "number", id: "toInput", value: toValue, min: fromValue + 10, max: "1000", onChange: handleToInputChange })] })] })] }), _jsx("div", { className: "r_container", children: _jsxs("div", { className: "input-date", children: [_jsx("input", { type: "text", maxLength: 2, onBlur: handleChange, value: inpDay, onChange: (e) => setInpDay(e.target.value) }), " "] }) })] }), _jsxs("div", { className: "footer", children: [_jsxs("p", { children: [_jsx("a", { href: "legal.html", children: "Legal" }), " \u00A0\u00A0\u00A0\u00A0\u00A0", " ", _jsx("a", { href: "privacy.html", children: "Privacy Policy" })] }), _jsx("p", { children: "\u00A9 2024 Auction Hub. All Rights Reserved." })] })] }));
}
export default AllProducts;
