import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles,children  }) => {
  const { token, role } = useSelector((state) => state.auth);


  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />; // Render child routes
};

export default PrivateRoute;
