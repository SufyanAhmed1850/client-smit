import React from "react";
import SidePanel from "../Components/SidePanel";
import "./css/students.css";
import studentsLargeIcon from "../assets/images/students-icon-large.svg";
import addIcon from "../assets/images/add-icon.svg";
import profileIcon from "../assets/images/profile-icon-small.svg";
import editIcon from "../assets/images/edit.svg";
import viewIcon from "../assets/images/view.svg";

const Attendance = () => {
    return (
        <div className="students-container">
            <SidePanel />
            <div className="students-main">
                <div className="students-header">
                    <div className="students-title">
                        <img src={studentsLargeIcon} alt="Students" />
                        <h1>Attendance</h1>
                    </div>
                </div>
                <div className="students-data-head">
                    <p>ID</p>
                    <p>Profile</p>
                    <p>Name</p>
                    <p>Check in</p>
                    <p>Check out</p>
                </div>
                <div className="student-data">
                    <p>1</p>
                    <div className="profile-image">
                        <img src={profileIcon} alt="Profile" />
                    </div>
                    <p>Abdullah</p>
                    <p>Checked In Time</p>
                    <p>Checked Out Time</p>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
