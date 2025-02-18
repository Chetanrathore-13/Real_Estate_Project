import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import UserDashboard from "./pages/UserDashboard";
import { useSelector } from "react-redux";
import CountryManager from "./pages/LocationManager";
import Animation from "./components/Animation";
import './App.css';

const PrivateRoute =  ({ children, allowedRoles }) => {
    const { token, role } =  useSelector((state) => state.auth);
    console.log(token,role)
    
    if (!token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/login" />;

    return children;
};


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Signup />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/animation" element={<Animation />} />
                <Route path="/location" element={<CountryManager/>}/>
                <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>} />
                <Route path="/vendor-dashboard" element={<PrivateRoute allowedRoles={["vendor"]}><VendorDashboard /></PrivateRoute>} />
                <Route path="/user-dashboard" element={<PrivateRoute allowedRoles={["user"]}><UserDashboard /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
