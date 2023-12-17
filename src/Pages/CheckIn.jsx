import React from "react";
import "./css/checkIn.css";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Button as MuiButton, Modal, Box } from "@mui/material";
import StdImg from "../assets/images/std.jpg";
import { useState, useEffect, useContext } from "react";
import MuiModal from "../Components/modal";
import userContext from "../Context/UserContext";
import { axiosPrivate } from "../api/axios";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

function CheckIn() {
    const { userData } = useContext(userContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [time, setTime] = useState("");
    const [error, setError] = useState(null);
    const [checkInToday, setCheckInToday] = useState("");
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Make a request to fetch today's check-in data and current check-in status
            try {
                const res = await axiosPrivate("/api/check/today");
                setCheckInToday(res.data.checkInData.checkIn.time);
                const isCheckedIn = res.data.isCheckedIn;
                setIsCheckedIn(isCheckedIn); // Assuming isCheckedIn is a state variable
                console.log(res);
            } catch (e) {
                console.error(e.message);
            }
        };
        if (!checkInToday) {
            fetchData();
        }
    }, [checkInToday]);
    console.log("isCheckedIn", isCheckedIn);

    useEffect(() => {
        const getLocationAndTime = () => {
            const currentTime = new Date();
            setTime(currentTime);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        console.log(position.coords.latitude);
                        console.log(position.coords.longitude);
                    },
                    (err) => {
                        setError(err.message);
                    },
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };
        if (!longitude || !latitude || !time) {
            getLocationAndTime();
        }
    }, [longitude, latitude, time]);

    const formateTime = (time) => {
        const formattedTime = new Date(time).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return formattedTime;
    };

    const handleCheckIn = async () => {
        try {
            console.log("Checking in...");
            const res = await axiosPrivate.post("/api/check/checkin", {
                checkIn: {
                    time: new Date().toISOString(),
                    location: {
                        lon: longitude,
                        lat: latitude,
                    },
                },
            });
            console.log(res);
            setIsCheckedIn(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleCheckOut = async () => {
        try {
            console.log("Checking out...");
            const res = await axiosPrivate.post("/api/check/checkout", {
                checkOut: {
                    time: new Date().toISOString(),
                    location: {
                        lon: longitude,
                        lat: latitude,
                    },
                },
            });
            console.log(res);
            setIsCheckedIn(false);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <main className="page-container">
            <MuiModal open={open} handleClose={handleClose} />
            <div className="header-section">
                <h1 className="page-title">Student Information</h1>
                <MuiButton
                    sx={{ textTransform: "capitalize" }}
                    className="clock-in-button"
                    color="primary"
                    component="label"
                    variant="contained"
                >
                    Refresh
                </MuiButton>
            </div>
            <div className="student-card">
                <div className="avatar-section-container">
                    <div className="avatar-section">
                        <img
                            alt="Student avatar"
                            className="avatar-image"
                            src={userData.profile || StdImg}
                        />
                        <div>
                            <h2 className="student-name">
                                {userData.firstName + " " + userData.lastName}
                            </h2>
                            <Chip
                                sx={{
                                    "& .MuiChip-label": {
                                        color: "#FFFFFF",
                                    },
                                }}
                                size="small"
                                label={"ID: " + userData.studentId}
                                color="success"
                                variant="filled"
                            />
                        </div>
                    </div>
                    {/* <div className="already-clockIn-message">
                        <h3>Congratulations</h3>
                        <p>Your attendation is marked for today.</p>
                    </div> */}
                </div>
                <div className="grid-container">
                    <div>
                        <p className="label">Course Name:</p>
                        <p>{userData.course}</p>
                    </div>
                    <div>
                        <p className="label">Checked In Time:</p>
                        {checkInToday && <p>{formateTime(checkInToday)}</p>}
                    </div>
                    <div>
                        <p className="label">Checked Out Time:</p>
                        <p>04:00 PM</p>
                    </div>
                </div>
                <div className="action-section">
                    <MuiButton
                        sx={{ textTransform: "capitalize" }}
                        color="warning"
                        component="label"
                        variant="contained"
                        onClick={handleOpen}
                    >
                        Attendance
                    </MuiButton>
                    <MuiButton
                        // Conditionally render the button label based on the isCheckedIn state
                        sx={{ textTransform: "capitalize" }}
                        color={isCheckedIn ? "warning" : "success"}
                        component="label"
                        variant="contained"
                        onClick={isCheckedIn ? handleCheckOut : handleCheckIn} // Trigger different functions based on the check-in status
                    >
                        {isCheckedIn ? "Check Out" : "Check In"}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={
                                isCheckedIn ? handleCheckOut : handleCheckIn
                            }
                        />{" "}
                        {/* Trigger different functions based on the check-in status */}
                    </MuiButton>
                </div>
            </div>
        </main>
    );
}

export default CheckIn;
