import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo black.png"; // Replace with your logo image path
import dashboardIcon from "../../assets/Sidebar icons/Dashboard.svg";
import searchIcon from "../../assets/Sidebar icons/Search.svg";
import cartIcon from "../../assets/Sidebar icons/Cart.svg";
import wishlistIcon from "../../assets/Sidebar icons/Fav.svg";
import logoutIcon from "../../assets/Sidebar icons/Logout.svg";
import settingsIcon from "../../assets/Sidebar icons/Settings.svg";
import logofull from "../../assets/CompanyLogo-transparent.png";
import KayraLogo from "../../assets/KayraLogo.png";
import { Clock } from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`opacity-95 z-10 fixed top-0 h-full bg-white transition duration-300 ease-out ${
        isExpanded ? "w-60" : "md:w-20 w-14"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col items-center h-full">
        {/* Logo */}
        {isExpanded ? (
          <div className="flex items-center justify-center py-4">
            <img src={logofull} alt="Logo" className="w-[80%] h-auto" />
          </div>
        ) : (
          <div className="flex items-center justify-center py-4">
            <img src={logo} alt="Logo" className="w-[70%] h-auto" />
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex items-center flex-col mt-10 space-y-4 flex-1 w-[90%]">
          <SidebarItem
            to="/dashboard"
            icon={dashboardIcon}
            label="Dashboard"
            isExpanded={isExpanded}
          />
          <SidebarItem
            to="/search"
            icon={searchIcon}
            label="Search"
            isExpanded={isExpanded}
          />
          <SidebarItem
            to="/cart"
            icon={cartIcon}
            label="Cart"
            isExpanded={isExpanded}
          />
          <SidebarItem
            to="/wishlist"
            icon={wishlistIcon}
            label="Wishlist"
            isExpanded={isExpanded}
          />
          <SidebarItem
            to="/orderhistory"
            icon={Clock}
            label="Order History"
            isExpanded={isExpanded}
          />
        </nav>

        {/* User Profile and Logout */}
        <div className="flex flex-col items-center mb-4 w-[90%]">
          <div className="flex items-center justify-around mb-4 w-full">
            <img src={KayraLogo} alt="User Icon" className="w-10 h-10" />
            {isExpanded && (
              <div>
                <p className="mb-0 font-semibold leading-tight">John Doe</p>
                <p className="text-sm text-gray-500 leading-tight">
                  Kayra Creation
                </p>
              </div>
            )}
            {isExpanded && (
              <NavLink
                to="/settings"
                className="rounded-md hover:bg-gray-200 p-2"
              >
                <img
                  src={settingsIcon}
                  alt="Settings Icon"
                  className="w-6 h-6"
                />
              </NavLink>
            )}
          </div>
          <button
            className={`flex items-center justify-center space-x-2 ${
              isExpanded ? "w-full" : "w-[75%]"
            } px-2 py-2 rounded-lg hover:border-0 text-red-500 hover:bg-red-100 border-gray-800 border`}
          >
            <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5" />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

// SidebarItem Component for Reusability
const SidebarItem = ({ to, icon, label, isExpanded }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ${
          !isExpanded && "justify-center"
        } w-full px-4 py-2 rounded-md transition-colors duration-200 ${
          isExpanded
            ? isActive
              ? "bg-blue-200 text-theme-950" // Active style when expanded
              : "hover:bg-gray-200 text-gray-700"
            : isActive
            ? "relative before:absolute before:left-0 before:top-0 before:bottom-0 before:rounded-sm before:w-1 before:bg-theme-950" // Active style when collapsed
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      <img src={icon} alt={`${label} Icon`} className="w-5 h-5" />
      {isExpanded && <span className="ml-2">{label}</span>}
    </NavLink>
  );
};
