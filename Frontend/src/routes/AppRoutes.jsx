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
import PropertyFeatures from "../pages/admin/PropertyFeatures";
import PropertyStatusManager from "../pages/admin/PropertyStatus";
import PropertyLabelCRUD from "../pages/admin/PropertyLabel";
import PropertyTypes from "../pages/admin/PropertyTypes";
import  PropertyList  from "../components/PropertyList";
import PropertyForm from "../components/PropertyForm";
import  PropertyDetails  from "../components/PropertyDetails";
import Project from "../pages/admin/Project";
import { ProjectList } from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import ProjectTypes from "../components/ProjectType";
import ProjectFeatures from "../components/ProjectFeature";
import {ProjectDetail} from"../components/ProjectDetail"
import HomePage from "../pages/public/HomePage"
import PropertyDetailsPublic from "../components/PropertyDetailsPublic";

import Aboutus from "../pages/public/Aboutus";
import Contact from "../pages/public/Contact";
import FAQ from "../pages/public/FAQ";
import PageNot from "../pages/public/PageNot";
import Blog from "../pages/public/Blog";
import Agency from "../pages/public/Agency";
import Services from "../pages/public/Services";
import Agent from "../pages/public/Agent";
import PropertyPublic from "../pages/public/PropertyPublic";
import ProjectsPage from "../pages/public/ProjectsPage";
import ProjectDetailsPage from "../pages/public/ProjectDetailsPage";
import BlogDetailPublic from "../pages/public/components/BlogDetailPublic";


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

const router = createBrowserRouter([
  // Public Routes (Login)
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth/:reason", element: <LoginPage /> },
      { path: "property/:slug", element: <PropertyDetailsPublic /> },
        // { path: "signup", element: <SignupForm /> },
        {
          path: "/projects",
          element: <ProjectsPage />,
        },
      {
        path: "/properties",
        element: <PropertyPublic/>,
      },
      {
        path: "/projects/:slug",
        element: <ProjectDetailsPage/>,
      },
      {
        path: "/Blog/:slug",
        element: <BlogDetailPublic/>,
      },
    ],
  },
  {
    path: "/test",
    element: <Test />,
  },

  //mine 
  {
    path: "/about-us",
    element: <Aboutus/>,
  },
  
  {
    path: "/Blog",
    element: <Blog/>,
  },
  {
    path: "/contact-us",
    element: <Contact/>,
  },
  {
    path: "/faq",
    element: <FAQ/>,
  },
  {
    path: "/page-404",
    element: <PageNot/>,
  },
  {
    path: "/agency",
    element: <Agency/>,
  },
  {
    path: "/service",
    element: <Services/>,
  },
  {
    path: "/agent",
    element: <Agent/>,
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
          { path: ":slug", element: <BlogDetail /> },
          { path: "new", element: <BlogForm /> },
          { path: "edit/:slug", element: <BlogForm /> },
          {path:"blog-Category", element:<BlogCategory/>},
          {path:"blog-tag",element:<BlogTag/>}
        ],
      },
      {
        path: "property",
        element: <Property />,
        children: [
          { index: true, element: <PropertyList /> },
          { path: ":slug", element: <PropertyDetails /> },
          { path: "new", element: <PropertyForm /> },
          { path: "edit/:slug", element: <PropertyForm /> },
          {path:"country", element: <LocationManager /> },
          {path:"state",element:<StateManager/>},
          {path:"city",element:<CityManager/>}, 
          {path:"property-status",element:<PropertyStatusManager/>},
          {path:"property-label",element:<PropertyLabelCRUD/>},
          {path:"property-features",element:<PropertyFeatures/>},
          {path:"property-types",element:<PropertyTypes/>}
        ],
      },
      {
        path: "projects",
        element: <Project/>,
        children:[
          {index:true,element:<ProjectList/>},
          {path:"edit/:slug",element:<ProjectForm/>},
          {path:":slug",element:<ProjectDetail/>},
          {path:"new",element:<ProjectForm/>},
          {path:"project-types", element:<ProjectTypes/>},
          {path:"project-features",element:<ProjectFeatures/>}
        ]
      },
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
    element: <PageNot/>,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
