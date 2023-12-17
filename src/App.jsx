import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/login";
import CheckIn from "./Pages/CheckIn.jsx";
import Students from "./Pages/Students";
import Attendance from "./Pages/Attendance";

const App = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<CheckIn />} />
                <Route path="/admin" element={<Students />} />
                <Route path="/admin/attendance" element={<Attendance />} />
                <Route path="/*" element={<h1>404</h1>} />
            </Routes>
        </>
    );
};

export default App;
