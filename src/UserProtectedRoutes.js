import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function UserProtectedRoutes({ children }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = cookies.get("ADMIN_TOKEN");

  return token ? children : <Navigate to="/Login" replace />;
}