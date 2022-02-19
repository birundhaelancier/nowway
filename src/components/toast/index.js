import React from "react";
import "./toast.css";

const Toast = ({ handleClose, show, message }) => {
    return (
        <div className="toasted">
            <div className="toast-content">
                <div>{message}</div>
                <button className="closebtn" onClick={handleClose}>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
};

export default Toast;