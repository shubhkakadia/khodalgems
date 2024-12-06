import React, { useState } from "react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/CompanyLogo-transparent.png";
import ContactSupport from "./ContactSupport";
import IGILogo from "../assets/IGI Logo.png";
import GIALogo from "../assets/GIA Logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-[460px] h-auto"
          />
        </Link>
        <form>
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
              type="button"
              onClick={handleLogin}
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
