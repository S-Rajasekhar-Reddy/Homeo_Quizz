import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);