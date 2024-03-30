import React from "react";
import { ReactDOM } from "react";
import { createRoot } from 'react-dom/client';
import "./styles.css";

import App from "./App.js";

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
