import React from "react";
import logoIcon from "../assets/images/logo.svg";
import attendanceIcon from "../assets/images/attendance-icon.svg";
import studentsIcon from "../assets/images/students-icon.svg";
import "./css/sidepanel.css";

const SidePanel = () => {
    return (
        <div className="side-panel">
            <div className="logo">
                <img src={logoIcon} alt="Logo" />
            </div>
            <div className="students-tab">
                <img src={attendanceIcon} alt="Logo" />
                <h2>Attendance</h2>
            </div>
            <div className="attendance-tab">
                <img src={studentsIcon} alt="Logo" />
                <h2>Students</h2>
            </div>
            <div className="logout">
                <h2>Logout</h2>
            </div>
        </div>
    );
};

export default SidePanel;
