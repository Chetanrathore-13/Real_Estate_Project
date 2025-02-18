import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <h2>Vendor Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default VendorDashboard;
