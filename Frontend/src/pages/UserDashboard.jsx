import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default UserDashboard;
