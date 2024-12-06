import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Protected/Dashboard";
import UserProtectedRoutes from "./UserProtectedRoutes";
import PageNotFound from "./components/PageNotFound";
import React from "react";
import Home from "./components/Home";
import Contactus from "./components/Contactus";
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
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <div className="bg-main-bg">
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
          {/* <Route path="contactus" element={<Contactus />} /> */}
          <Route path="contact" element={<ContactUs />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orderhistory" element={<OrderHistory />} />
          <Route path="search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="stones" element={<Stones />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="settings" element={<Settings />} />
          <Route path="stonedetails/:number" element={<DiamondDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
