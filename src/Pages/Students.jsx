import React from "react";
import SidePanel from "../Components/SidePanel";
import "./css/students.css";
import studentsLargeIcon from "../assets/images/students-icon-large.svg";
import addIcon from "../assets/images/add-icon.svg";
import profileIcon from "../assets/images/profile-icon-small.svg";
import editIcon from "../assets/images/edit.svg";
import viewIcon from "../assets/images/view.svg";
import RightDrawer from "../Components/RightDrawer";
import studentsContext from "../Context/StudentsContext";
import { useContext } from "react";

const Students = () => {
    const { students, setStudents, isLoading } = useContext(studentsContext);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleClick = () => {
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className="students-container">
            <SidePanel />
            <div className="students-main">
                <div className="students-header">
                    <div className="students-title">
                        <img src={studentsLargeIcon} alt="Students" />
                        <h1>Students</h1>
                    </div>
                    <div onClick={handleClick} className="add-student-button">
                        <img src={addIcon} alt="Add" />
                        <h3>Add Student</h3>
                    </div>
                </div>
                <div className="students-data-head">
                    <p>ID</p>
                    <p>Profile</p>
                    <p>Name</p>
                    <p>Course</p>
                    <p>Password</p>
                    <p>Edit</p>
                    <p>View</p>
                </div>
                {students.length > 0 &&
                    students.map((student, ind) => {
                        return (
                            <div key={ind} className="student-data">
                                <p>{student.studentId || 1}</p>
                                <div className="profile-image">
                                    <img
                                        src={student.profile || profileIcon}
                                        alt="Profile"
                                    />
                                </div>
                                <p>
                                    {student.firstName + " " + student.lastName}
                                </p>
                                <p>{student.course}</p>
                                <p>{student.password}</p>
                                <div className="view">
                                    <img src={editIcon} alt="Edit" />
                                </div>
                                <div className="edit">
                                    <img src={viewIcon} alt="View" />
                                </div>
                            </div>
                        );
                    })}
            </div>
            <RightDrawer open={drawerOpen} onClose={handleCloseDrawer} />
        </div>
    );
};

export default Students;
