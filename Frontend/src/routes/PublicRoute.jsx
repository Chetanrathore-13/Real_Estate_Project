import { Navigate, Outlet } from "react-router-dom";
import NavbarMine from "../pages/public/components/NavbarMine";
import FooterMine from "../pages/public/components/FooterMine";

const PublicRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/login" replace /> : 
  <div className="flex flex-col space-y-4">
    <NavbarMine/> 
    <Outlet /> 
    <FooterMine/>
    </div>;
};

export default PublicRoute;
