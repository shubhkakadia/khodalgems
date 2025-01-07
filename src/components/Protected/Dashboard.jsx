import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  ShoppingCart,
  Diamond,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Video,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSuccess, setError } from "../state/stockAPI.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [stoneCount, setStoneCount] = useState(0);
  const [activeView, setActiveView] = useState("orders");
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stock);

  const fetchStock = async () => {
    try {
      // Set loading state when the API call starts
      dispatch(setLoading(true));

      // Prepare the request data
      const defaultParams = {
        Shape: "",
        Color: "",
        Intensity: "",
        Overtone: "",
        FancyColor: "",
        Clarity: "",
        FromToCtsSize: "",
        FromCts: 0,
        ToCts: 0,
        Cut: "",
        Polish: "",
        Symmetry: "",
        Flr: "",
        HandA: "",
        EyeClean: "",
        Lab: "",
        Location: "",
      };

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://${process.env.REACT_APP_SERVER_ADDRESS}/GetStock/StockWithPara`,
        headers: { "Content-Type": "application/json" },
        data: defaultParams,
      };

      const response = await axios.request(config);

      if (response.data && response.data.status === 1) {
        console.log(response.data.UserData);
        dispatch(setSuccess(response.data.UserData || []));
        dispatch(setError(null));
      } else {
        dispatch(
          setError(response.data.message || "Unexpected response format")
        );
        dispatch(setSuccess([]));
      }
    } catch (error) {
      // Comprehensive error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      dispatch(setError(errorMessage));
      dispatch(setSuccess([]));

      // Show toast notification for the error
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Call the fetch function
    fetchStock();
  }, []);

  console.log(stock)

  return (
    <div className="flex w-full bg-main-bg">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto w-full">
        {/* Header*/}
        <div className="p-4 sticky top-0 bg-main-bg z-[5] flex md:justify-between md:items-center md:flex-row flex-col gap-2">
          <div>
            <h2 className="text-4xl font-semibold text-theme-600">Dashboard</h2>
            <p className="text-lg text-gray-400">
              Welcome back, Shubh Kakadia!
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/contactus")}
              className="flex items-center px-4 py-2 relative animate-[attention_1s_ease-in-out_infinite] hover:bg-theme-300 hover:animate-none rounded-md hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Contact Us</span>
              <style jsx global>{`
                @keyframes attention {
                  0% {
                    color: rgb(75 85 99);
                  }
                  50% {
                    color: rgb(79 70 229);
                  }
                  100% {
                    color: rgb(75 85 99);
                  }
                }
              `}</style>
            </button>
          </div>
        </div>

        {/* Action Boxes */}
        <div className="mx-4 mb-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cart Box */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Cart Items
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {cartCount}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  View Cart
                </button>
              </div>
            </div>

            {/* Total Stones */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-theme-100 p-3 rounded-lg">
                    <Diamond className="h-6 w-6 text-theme-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Total Diamonds
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stock?.success?.length > 0 ? stock?.success?.length : 0}
                    </h3>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/search")}
                className="w-full flex items-center justify-center px-4 py-2 bg-theme-600 text-white rounded-md hover:bg-theme-700 transition-colors text-sm"
              >
                Search Diamonds
              </button>
            </div>

            {/* Wishlist */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Wishlist
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {savedCount}
                    </h3>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/wishlist")}
                className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm"
              >
                View Wishlist
              </button>
            </div>

            {/* Contact Options */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Contact Us
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900">
                    24/7 Support
                  </h3>
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/contact/phone")}
                  className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                >
                  <Phone className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:text-gray-300" />
                  +91 94096 58456
                </button>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/919409658456"
                    className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                  >
                    <MessageCircle className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:text-gray-300" />
                    WhatsApp
                  </a>
                  <button
                    onClick={() =>
                      (window.location.href = "mailto:sales@khodalgems.com")
                    }
                    className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                  >
                    <Mail className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:text-gray-300" />
                    Email Us
                  </button>
                </div>

                <div className="flex gap-2">
                  <a
                    href="skype:live:vadsak_vin?call"
                    className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                  >
                    <Video className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:text-gray-300" />
                    Skype
                  </a>
                  <a
                    href="weixin://dl/chat?khodalgems"
                    className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                  >
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600 dark:text-gray-300" />
                    WeChat
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Overview Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md md:max-w-full max-w-[300px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center md:flex-row flex-col gap-4">
                <div className="flex items-center space-x-4 md:flex-row flex-col gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Activity Overview
                  </h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveView("orders")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeView === "orders"
                          ? "bg-white text-theme-600 shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                      }`}
                    >
                      Recent Orders
                    </button>
                    <button
                      onClick={() => setActiveView("history")}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        activeView === "history"
                          ? "bg-white text-theme-600 shadow-sm"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                      }`}
                    >
                      Purchase History
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-500">
                  Order activity tracking will be available shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
