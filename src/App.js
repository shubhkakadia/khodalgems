import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Protected/Dashboard";
import UserProtectedRoutes from "./UserProtectedRoutes";
import PageNotFound from "./components/PageNotFound";
import React from "react";
import Home from "./components/Home";
import Contactus from "./components/Contact";
import Aboutus from "./components/Aboutus";
import Settings from "./components/Protected/Settings";
import Wishlist from "./components/Protected/Wishlist";
import Cart from "./components/Protected/Cart";
import Search from "./components/Protected/Search";
import Stones from "./components/Protected/Stones";
import { ToastContainer } from "react-toastify";
import OrderHistory from "./components/Protected/OrderHistory";
import DiamondDetails from "./components/Protected/DiamondDetails";
import ContactUs from "./components/Protected/Contactus";
import { ProtectedRoute, TokenService } from "./TokenService";
import Register from "./components/Register";
import AdminPortal from "./components/Protected/AdminPortal";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="h-svh bg-main-bg">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="contactus"
          element={
            <ProtectedRoute adminRoute={false}>
              <ContactUs />
            </ProtectedRoute>
          }
        />
        <Route path="aboutus" element={<Aboutus />} />
        <Route path="" element={<Home />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute adminRoute={false}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="orderhistory" element={<OrderHistory />} /> */}
        <Route
          path="search"
          element={
            <ProtectedRoute adminRoute={false}>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute adminRoute={true}>
              <AdminPortal />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute adminRoute={false}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="stones"
          element={
            <ProtectedRoute adminRoute={false}>
              <Stones />
            </ProtectedRoute>
          }
        />
        <Route
          path="wishlist"
          element={
            <ProtectedRoute adminRoute={false}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute adminRoute={false}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route
          path="stonedetails/:number"
          element={
            <ProtectedRoute adminRoute={false}>
              <DiamondDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="*"
          element={
            <Navigate
              to={TokenService.getToken() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
