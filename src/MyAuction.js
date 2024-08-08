import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCard from "./components/ProductCard";
const image = "https://learn.corel.com/wp-content/uploads/2022/02/car_art7.jpg";
const title = "Test";
const des = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a libero quis tellus ultricies elementum. Suspendisse aliquet nisi quis diam sagittis semper.";
const price = 1000;
const endDate = new Date("2024-06-21T00:00:00");
const pId = 1;
function MyAuction() {
    return (_jsx("div", { className: "testmain", children: _jsxs("div", { className: "products", children: [_jsx(ProductCard, { img: image, title: title, description: des, currentPrice: price, endDate: endDate, id: pId, message: "time out" }), _jsx(ProductCard, { img: image, title: title, description: des, currentPrice: price, endDate: new Date("2024-06-27T00:00:00"), id: pId, message: "" }), _jsx(ProductCard, { img: image, title: title, description: des, currentPrice: price, endDate: endDate, id: pId, message: "you win" })] }) }));
}
export default MyAuction;
