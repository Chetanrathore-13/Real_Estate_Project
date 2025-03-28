import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import loginImage from '../../../public/images/login-page-02.jpg';
import { loginUser, signupUser } from "../../redux/authSlice.js";

const LoginPage = () => {
  const { reason } = useParams();  // Get reason from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(reason !== "signup"); // Default: Login unless reason is "signup"
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLogin(reason !== "signup");  // Update state when URL param changes
  }, [reason]);

  const changeLoginStatus = () => {
    if (isLogin) {
      navigate("/login/signup");  // Navigate to signup page
    } else {
      navigate("/login");  // Navigate to login page
    }
    setIsLogin((prev) => !prev);  // Toggle state
  };

  const handleAuth = async (formData) => {
    setLoading(true);
    try {
      let data;
      if (isLogin) {
        data = await dispatch(loginUser(formData)).unwrap();
        console.log(data);
        if (data?.role === "vendor") navigate("/vendor");
        else if (data?.role === "user") navigate("/user");
        else if (data?.role === "admin") navigate("/admin");
      } else {
        data = await dispatch(signupUser(formData)).unwrap();
        if (data) {
          console.log("Signup successful, switching to login mode.");
          changeLoginStatus();
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-24">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {isLogin ? (
              <LoginForm handleLogin={changeLoginStatus} login={handleAuth} />
            ) : (
              <SignupForm handleLogin={changeLoginStatus} signup={handleAuth} />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block mt-16">
        <img
          src={loginImage}
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
