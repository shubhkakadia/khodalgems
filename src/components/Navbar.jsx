import React, { useState } from "react";
import companyLogo from "../assets/CompanyLogo-transparent.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.success);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="relative px-6 py-5 flex justify-between items-center bg-white">
        <Link to="/">
          <img
            src={companyLogo}
            alt="none"
            className="w-[200px] h-auto lg:w-[286px] lg:h-[50px] sm:w-[200px] sm:h-auto"
          />
        </Link>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-theme-950 p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 right-24 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-16">
          <li>
            <Link
              className="text-sm text-gray-400 hover:text-theme-950 font-bold"
              to="/"
            >
              HOME
            </Link>
          </li>
          {/* <li>
            <Link
              className="text-sm text-gray-400 hover:text-theme-950 font-bold"
              to="/aboutus"
            >
              ABOUT US
            </Link>
          </li> */}
          <li>
            <Link
              className="text-sm text-gray-400 hover:text-theme-950 font-bold"
              to="/contact"
            >
              CONTACT US
            </Link>
          </li>
        </ul>
        {user.admin === 0 ? (
          <Link
            className="hidden lg:inline-block lg:ml-auto py-2 px-6 hover:text-theme-950 font-bold text-sm text-theme-300  transition duration-500"
            to="/dashboard"
          >
            DASHBOARD
          </Link>
        ) : user.admin === 1 ? (
          <Link
            className="hidden lg:inline-block lg:ml-auto py-2 px-6 hover:text-theme-950 font-bold text-sm text-theme-300  transition duration-500"
            to="/admin"
          >
            Admin Dashboard
          </Link>
        ) : (
          <Link
            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 hover:bg-theme-950 font-bold hover:text-main-bg text-sm text-theme-950 rounded-full border-[2px] border-theme-950 transition duration-500"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-menu fixed inset-0 z-50 flex">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50"
            onClick={toggleMenu}
          ></div>
          <nav className="relative w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <Link to="/">
                <img src={companyLogo} alt="none" width={200} />
              </Link>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-sm text-gray-700 font-bold hover:text-blue-500"
                  to="/"
                  onClick={toggleMenu}
                >
                  HOME
                </Link>
              </li>
              {/* <li>
                <Link
                  className="text-sm text-gray-700 font-bold hover:text-blue-500"
                  to="/aboutus"
                  onClick={toggleMenu}
                >
                  ABOUT US
                </Link>
              </li> */}
              <li>
                <Link
                  className="text-sm text-gray-700 font-bold hover:text-blue-500"
                  to="/contact"
                  onClick={toggleMenu}
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
            <div className="pt-14">
              <Link
                className="py-2 px-6 font-boldtext-sm text-theme-950 rounded-full border-[2px] border-theme-950 transition font-bold"
                to="/login"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
