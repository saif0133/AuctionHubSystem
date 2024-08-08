import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./components/ProductCard";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://mocki.io/v1/9ba55466-347b-4308-ad06-6b5465f7b7f0");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data);
                console.log(localStorage.getItem("authToken"));
            }
            catch (error) {
                if (error instanceof Error) {
                    setError(error);
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "testmain", children: [_jsx("h1", { children: "Loading..." }), " "] }));
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error.message] });
    }
    return (_jsxs("div", { className: "testmain", children: [_jsx("div", { className: "products", children: products.map((product) => {
                    return (_jsx(ProductCard, { img: product.image, title: product.title, description: product.description, currentPrice: product.price, endDate: new Date(product.endDate), id: product.pId, message: "" }, product.pId));
                }) }), _jsx(NavLink, { to: "/all", className: "btn-secondary btn", children: "Next" })] }));
};
export default Home;
