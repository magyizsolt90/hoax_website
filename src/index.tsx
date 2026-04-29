import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LuckyWheelPage from "./wheel/LuckyWheelPage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <LuckyWheelPage />
  </React.StrictMode>
);

reportWebVitals();
