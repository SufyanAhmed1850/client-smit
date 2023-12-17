import React from "react";
import "./css/modal.css";
import { Button, Modal } from "@mui/material";

const MuiModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="modal-main">
                <h1>Attendance Record</h1>
                <div className="attendance-table">
                    <div className="attendance-row">
                        <h2>Date/Day</h2>
                        <h2>Clock In Time</h2>
                        <h2>Clock Out Time</h2>
                    </div>
                    <div className="attendance-row">
                        <p>01/12/2023 (Mon)</p>
                        <p>08:00 AM</p>
                        <p>04:00 PM</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MuiModal;
