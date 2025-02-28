import React from 'react'
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import loginImage from '../../../public/images/login-page-02.jpg'
import {SignupForm} from "@/components/signup-form"
import { useState } from 'react'
import { loginUser, signupUser } from "../../redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

const LoginPage = () => {

  const [Login,setLogin] = useState(true)
  const [error, setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chnageloginStatus = () =>{
    if(Login){
       setLogin(false)
    }else{
      setLogin(true)
    }
  }

  const login = async (formData) => {
    try {
      let data; // Declare data properly
      if (Login) { // Assuming "isLogin" is a boolean state variable
        data = await dispatch(loginUser(formData)).unwrap();
        if (data?.role === "vendor") navigate("/vendor");
        else if (data?.role === "user") navigate("/user");
        else if (data?.role === "admin") navigate("/admin");
      } else {
        data = await dispatch(signupUser(formData)).unwrap();
        if (data) {
          console.log("i am running")
          chnageloginStatus(); // Switch to login mode after successful signup
        }
      }
    } catch (err) {
      console.error("Error during authentication:", err);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          {Login ? <LoginForm handlelogin ={chnageloginStatus} login = {login} /> : <SignupForm handlelogin ={chnageloginStatus} signup = {login}/>}
        </div>
      </div>
    </div>
    <div className="relative hidden bg-muted lg:block">
      <img
        src={loginImage}
        alt="Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
  )
}

export default LoginPage
