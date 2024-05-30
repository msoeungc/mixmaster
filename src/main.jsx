import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// importing react-toastify css
import "react-toastify/dist/ReactToastify.css";
// import ToastContainer component to access toast utility
import { ToastContainer } from "react-toastify";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  {/* Placing toast and adding autoclose prop */}
    <ToastContainer position="top-center" autoClose={2000}/>
    <App />
  </>
);
