import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/login" replace /> : <Outlet />;
};

export default PublicRoute;
