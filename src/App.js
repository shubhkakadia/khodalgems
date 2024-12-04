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

function App() {
  return (
    <div className="bg-main-bg">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route path="" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="stones" element={<Stones />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
