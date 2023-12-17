import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StudentsProvider } from "./Context/StudentsContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <StudentsProvider>
                <App />
            </StudentsProvider>
        </UserProvider>
    </BrowserRouter>,
);
