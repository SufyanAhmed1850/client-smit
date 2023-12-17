import * as React from "react";
import { useState, useEffect } from "react";
import dummyUser from "../assets/images/dummy-user.svg";
import uploadIcon from "../assets/images/upload-icon.svg";
import { Button, Box, Drawer, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import axios from "axios";

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

export default function RightDrawer({ open, onClose }) {
    const [students, setStudents] = useState();
    const [startTime, setStartTime] = useState(dayjs("2022-04-17T09:00"));
    const [endTime, setEndTime] = useState(dayjs("2022-04-17T11:00"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [course, setCourse] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState("");

    const [state, setState] = useState({
        right: false,
    });

    useEffect(() => {
        console.log(startTime);
    }, [startTime]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const uploadImage = (file) => {
        console.log("UPLOAD");
        const formData = new FormData();
        formData.append("file", file);
        const promise = axios
            .post(import.meta.env.VITE_BE_URL + "/api/register/image", formData)
            .then((res) => {
                console.log(res);
                setImg(res.data.url);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            classEnd: startTime.$d,
            classStart: endTime.$d,
            firstName,
            lastName,
            email,
            phoneNumber,
            course,
            password,
            profile: img,
        };
        const saveData = axios
            .post(import.meta.env.VITE_BE_URL + "/api/register", dataToSend)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally((err) => {
                setStartTime("");
                setEndTime("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhoneNumber("");
                setCourse("");
                setPassword("");
                setImg("");
            });
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 600,
            }}
            role="presentation"
            onClick={() => handleClose(anchor)}
            onKeyDown={() => handleClose(anchor)}
        >
            <div className="drawer-main">
                <div className="add-student-head-drawer">
                    <h1>Add Student</h1>
                    <div onClick={handleSubmit} className="add-student-drawer">
                        <p>Add</p>
                    </div>
                </div>
                <div className="user-image">
                    <Button
                        sx={{
                            textTransform: "capitalize",
                            borderRadius: "50%",
                        }}
                        component="label"
                        variant="contained"
                    >
                        <img src={img || dummyUser} alt="Profile" />
                        <div className="upload-icon">
                            <img src={uploadIcon} alt="Upload" />
                        </div>
                        <VisuallyHiddenInput
                            onChange={(e) => uploadImage(e.target.files[0])}
                            type="file"
                        />
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="course">Course:</label>
                        <input
                            type="text"
                            id="course"
                            name="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimeField", "TimeField"]}>
                            <TimeField
                                label="Class Start"
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                            <TimeField
                                label="Class End"
                                value={endTime}
                                onChange={(newValue) => {
                                    setEndTime(newValue);
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {/* <button type="submit">Submit</button> */}
                </form>
            </div>
        </Box>
    );
    const handleClose = (anchor) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        if (open) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setCourse("");
            setPassword("");
            setImg("");
            onClose(anchor);
        }
    };

    return (
        <div className="none">
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={() => handleClose(anchor)}>
                        {anchor}
                    </Button>
                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={handleClose(anchor)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
