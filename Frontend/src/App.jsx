import AdminDashboard from "./pages/admin/AdminDashboard"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Vendordashbaord from "./pages/vendor/Vendor-dashbaord";
import Userdashbaord from "./pages/user/User-dashbaord";
import LoginPage from "./pages/public/LoginPage"
import { useSelector } from "react-redux";


function App() {
  const PrivateRoute =  ({ children, allowedRoles }) => {
    const { token, role } =  useSelector((state) => state.auth);
    console.log(token,role)
    
    if (!token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(role)) return <Navigate to="/login" />;

    return children;
};

  return (
    <Router>
        <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>} />
            <Route path="/vendor-dashboard" element={<PrivateRoute allowedRoles={["vendor"]}><Vendordashbaord /></PrivateRoute>} />
            <Route path="/user-dashboard" element={<PrivateRoute allowedRoles={["user"]}><Userdashbaord /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
    </Router>
);
}

export default App
