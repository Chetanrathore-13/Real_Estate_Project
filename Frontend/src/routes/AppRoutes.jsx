import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// Layouts
import AdminLayout from "../components/Layouts/AdminLayout";
import VendorLayout from "../components/Layouts/VendorLayout";
import UserLayout from "../components/Layouts/UserLayout";

// Pages
import LoginPage from "../pages/public/LoginPage";
import Test from "../admin-auth/Test";
import AdminHomePage from "../pages/admin/AdminHomePage";
import Blogs from "../pages/admin/Blogs";
import VendorHomePage from "../pages/vendor/VendorHomePage";
import UserHomePage from "../pages/user/UserHomePage";
import BlogList from "../components/BlogList";
import BlogDetail from "../components/BlogDetail";
import BlogForm from "../components/BlogForm";
import BlogCategory from "../pages/admin/BlogCategory";
import BlogTag from "../pages/admin/BlogTag";
import Property from "../pages/admin/Property";
import LocationManager from "../pages/admin/LocationManager";
import CityManager from "../pages/admin/CityManager";
import StateManager from "../pages/admin/StateManager";
import PropertyStatus from "../../../Backend/src/models/propertyStatus";
import PropertyLabel from "../../../Backend/src/models/propertyLabel";
import PropertyFeatures from "../pages/admin/PropertyFeatures";
import PropertyStatusManager from "../pages/admin/PropertyStatus";
import PropertyLabelCRUD from "../pages/admin/PropertyLabel";
import PropertyTypes from "../pages/admin/PropertyTypes";
import AllProperty from "../pages/admin/AllProperty.";

const getDashboardRoute = (role) => {
  switch (role) {
    case "admin":
      return "/admin";
    case "vendor":
      return "/vendor";
    case "user":
      return "/user";
    default:
      return "/";
  }
};

const ProtectedRedirect = () => {
  const token = localStorage.getItem("token");
  const role = useSelector((state) => state.auth.role);
  return token && role ? <Navigate to={getDashboardRoute(role)} replace /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  // Public Routes (Login)
  {
    path: "/",
    element: <PublicRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/test",
    element: <Test />,
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminHomePage /> },
      {
        path: "blogs",
        element: <Blogs />,
        children: [
          { index: true, element: <BlogList /> },
          { path: ":id", element: <BlogDetail /> },
          { path: "new", element: <BlogForm /> },
          { path: "edit/:id", element: <BlogForm /> },
          {path:"blog-Category", element:<BlogCategory/>},
          {path:"blog-tag",element:<BlogTag/>}
        ],
      },
      {
        path: "property",
        element: <Property />,
        children: [
          { index: true, element: <AllProperty /> },
          {path:"country", element: <LocationManager /> },
          {path:"state",element:<StateManager/>},
          {path:"city",element:<CityManager/>}, 
          {path:"property-status",element:<PropertyStatusManager/>},
          {path:"property-label",element:<PropertyLabelCRUD/>},
          {path:"property-features",element:<PropertyFeatures/>},
          {path:"property-types",element:<PropertyTypes/>}
        ],
      }
    ],
  },

  // Vendor Routes
  {
    path: "/vendor",
    element: (
      <PrivateRoute allowedRoles={["vendor"]}>
        <VendorLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <VendorHomePage /> }],
  },

  // User Routes
  {
    path: "/user",
    element: (
      <PrivateRoute allowedRoles={["user"]}>
        <UserLayout />
      </PrivateRoute>
    ),
    children: [{ index: true, element: <UserHomePage /> }],
  },

  // Redirect all other routes
  {
    path: "*",
    element: <ProtectedRedirect />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
