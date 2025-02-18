import  React from "react"
import { useState, useEffect } from "react"
import ImageCarousal from "../components/ImageCarousal"
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
 
  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        let data;
        if (isLogin) {
          data = await dispatch(loginUser(formData)).unwrap();
        } else {
          if (formData.password !== formData.confirmpassword) {
            throw new Error("Passwords do not match");
          }
          data = await dispatch(signupUser(formData)).unwrap();
        }
  
        if (data?.role === "vendor") navigate("/vendor-dashboard");
        else if (data?.role === "user") navigate("/user-dashboard");
        else if (data?.role === "admin") navigate("/admin-dashboard");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Image Carousel */}
      <div className="w-full md:w-4/5 h-64 md:h-screen relative overflow-hidden">
       <ImageCarousal/>
      </div>

      {/* Auth Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 p-10 rounded-xl">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">{isLogin ? "Login" : "Sign Up"}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Welcome back! Please login to your account." : "Create an account to get started."}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {!isLogin && (
              <div className="relative">
              <label htmlFor="confirmpassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmpassword"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
               <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            )}
            {!isLogin && (
             <div>
               <label className="block text-gray-700 font-medium mb-2">Select Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">-- Select Role --</option>
                <option value="vendor">Vendor</option>
                <option value="user">User</option>
          </select>
             </div>
            )}
             
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

