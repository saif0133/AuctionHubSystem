import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import Test from "./Menu";
import UserBar from "./UserBar";
import Card from "./components/ProductCard";

ReactDOM.createRoot(document.getElementById("container") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*
ReactDOM.createRoot(document.getElementById("testmenu") as HTMLElement).render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("testbar") as HTMLElement).render(
  <React.StrictMode>
    <UserBar />
  </React.StrictMode>
);
*/
/*ReactDOM.createRoot(document.getElementById("testmain") as HTMLElement).render(
  <React.StrictMode>
    <Product />
  </React.StrictMode>
);
*/
