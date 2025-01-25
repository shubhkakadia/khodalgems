import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import companyLogo from "../assets/CompanyLogo-transparent.png";
import ContactSupport from "./ContactSupport";
import IGILogo from "../assets/IGI Logo.png";
import GIALogo from "../assets/GIA Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminError,
  setAdminLoading,
  setAdminSuccess,
} from "./state/admin.js";
import { setUserError, setUserLoading, setUserSuccess } from "./state/user.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Save token to localStorage
  const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const handleLogin = () => {
    // Validate input
    if (!username || !password) {
      toast.warn("Please enter both username and password", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading("Logging in...", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });

    let data = JSON.stringify({
      username: username,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // Close loading toast
        toast.dismiss(loadingToastId);

        // Assuming the API returns a token in response.data.token
        const token = response.data.token;

        // Save token to localStorage
        setToken(token);

        // Show success toast
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // onClose: () => navigate('/dashboard')
        });
        console.log(response.data.user);
        if (response.data.user.admin === 1) {
          // Dispatch action to update Redux store
          dispatch(setUserSuccess(response.data.user));
          // dispatch(setAdminSuccess(response.data.user));
          // dispatch(setUserSuccess({}));
          navigate("/admin");
        } else {
          // Dispatch action to update Redux store
          dispatch(setUserSuccess(response.data.user));
          // dispatch(setAdminSuccess({}));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        // Close loading toast
        toast.dismiss(loadingToastId);

        // Handle login errors
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Login failed. Please check your credentials.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />

      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-[460px] h-auto"
          />
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label
              htmlFor="username"
              className="block text-slate-600 font-bold mb-1"
            >
              Username or email
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2 ml-1">
            <Link
              to="/forgot-username"
              className="text-xs text-slate-500 hover:underline"
            >
              Forgot Username?
            </Link>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-slate-600 font-bold mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-slate-500 hover:text-slate-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="mb-2 ml-1">
            <Link
              to="/forgot-password"
              className="text-xs text-slate-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="keep-logged-in"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              className="w-4 h-4 cursor-pointer text-theme-950 rounded focus:ring-theme-950"
            />
            <label
              htmlFor="keep-logged-in"
              className="ml-2 text-slate-500 text-sm"
            >
              Keep me logged in
            </label>
          </div>
          <div className="flex justify-around">
            <button
              type="submit"
              className="py-2 px-6 border-[2px] border-theme-950 text-theme-950 font-bold text-sm rounded-full transition duration-200 hover:bg-theme-950 hover:text-main-bg"
            >
              Login
            </button>
            <Link
              to="/register"
              className="py-2 px-6 border-[2px] border-theme-950 text-theme-950 font-bold text-sm rounded-full transition duration-200 hover:bg-theme-950 hover:text-main-bg"
            >
              Register
            </Link>
          </div>
        </form>
        <div className="flex justify-around items-center mx-14 my-4">
          <img src={IGILogo} alt="IGI Logo" className="w-[100px] h-[41px]" />
          <img src={GIALogo} alt="GIA Logo" className="w-[100px] h-[34px]" />
        </div>
        <div className="mt-8 text-center">
          <button
            className="text-sm text-slate-500 hover:underline"
            onClick={() => setShowContactSupport(true)}
          >
            Contact Support
          </button>
        </div>
        {showContactSupport && (
          <ContactSupport onClose={() => setShowContactSupport(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;
