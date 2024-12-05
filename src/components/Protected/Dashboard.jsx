import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  ShoppingCart,
  Diamond,
  Star,
  ExternalLink,
  Phone,
  Bell,
  Search,
  Mail,
  MessageCircle,
  Video,
  MessageSquare,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

// Sample data
const purchaseHistory = [
  { month: "Jan", purchases: 4000, average: 2400 },
  { month: "Feb", purchases: 3000, average: 2100 },
  { month: "Mar", purchases: 2000, average: 2800 },
  { month: "Apr", purchases: 2780, average: 3908 },
  { month: "May", purchases: 1890, average: 4800 },
  { month: "Jun", purchases: 2390, average: 3800 },
];

const myOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-01",
    stones: 5,
    totalCarats: "10.25",
    amount: "$25,400",
    status: "In Transit",
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-02",
    stones: 3,
    totalCarats: "6.75",
    amount: "$18,900",
    status: "Processing",
  },
  {
    id: "ORD-2024-003",
    date: "2024-03-03",
    stones: 8,
    totalCarats: "15.50",
    amount: "$42,000",
    status: "Confirmed",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(5);
  const [savedCount, setSavedCount] = useState(32);
  const [stoneCount, setStoneCount] = useState(6452);
  const [activeView, setActiveView] = useState("orders");

  return (
    <div className="flex w-full">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto m-4 space-y-6 w-full">
        {/* Header*/}
        <div className="sticky top-0 bg-main-bg z-[5] flex md:justify-between md:items-center md:flex-row flex-col gap-2">
          <div>
            <h2 className="text-4xl font-semibold text-theme-600">Dashboard</h2>
            <p className="text-lg text-gray-400">Welcome back, John Doe!</p>
          </div>
          <div>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center px-4 py-2 relative animate-[attention_1s_ease-in-out_infinite] hover:bg-theme-300 hover:animate-none rounded-md hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>Contact Us</span>
              <style jsx global>{`
                @keyframes attention {
                  0% {
                    color: rgb(75 85 99); /* text-gray-600 */
                  }
                  50% {
                    color: rgb(79 70 229); /* text-theme-600 */
                  }
                  100% {
                    color: rgb(75 85 99); /* text-gray-600 */
                  }
                }
              `}</style>
            </button>
            {/* <button className="p-2 hover:bg-gray-100 rounded-full relative" onClick={() => navigate('/notifications')}>
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button> */}
          </div>
        </div>

        {/* Action Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Cart Box */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cart Items</p>
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
                {/* <ExternalLink className="h-4 w-4 mr-2" /> */}
                View Cart
              </button>
            </div>
          </div>

          {/* Total Stones */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-theme-100 p-3 rounded-lg">
                  <Diamond className="h-6 w-6 text-theme-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Diamonds</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stoneCount}
                  </h3>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/search")}
              className="w-full flex items-center justify-center px-4 py-2 bg-theme-600 text-white rounded-md hover:bg-theme-700 transition-colors text-sm"
            >
              {/* <ExternalLink className="h-4 w-4 mr-2" /> */}
              Search Diamonds
            </button>
          </div>

          {/* Wishlist */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Wishlist</p>
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
              {/* <ExternalLink className="h-4 w-4 mr-2" /> */}
              View Wishlist
            </button>
          </div>

          {/* Contact Options */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Contact Us</p>
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
                <Phone className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                +1 234 567 8900
              </button>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/919409658456"
                  className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                >
                  <MessageCircle className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                  WhatsApp
                </a>
                <button
                  onClick={() =>
                    (window.location.href = "mailto:sales@khodalgems.com")
                  }
                  className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                >
                  <Mail className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                  Email Us
                </button>
              </div>

              <div className="flex gap-2">
                <a
                  href="skype:live:vadsak_vin?call"
                  className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                >
                  <Video className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                  Skype
                </a>
                <a
                  href="weixin://dl/chat?khodalgems"
                  className="w-full flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm group"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                  WeChat
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle View Section */}
        <div className="bg-white rounded-lg shadow-md md:max-w-full max-w-[300px]">
          <div className="p-4 border-b border-gray-200">
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
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Recent Orders
                  </button>
                  <button
                    onClick={() => setActiveView("history")}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeView === "history"
                        ? "bg-white text-theme-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Purchase History
                  </button>
                </div>
              </div>
              {activeView === "orders" && (
                <button className="text-theme-600 hover:text-theme-700 text-sm font-medium">
                  View All Orders
                </button>
              )}
            </div>
          </div>

          <div className="p-4">
            {activeView === "history" ? (
              // Purchase History Chart
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={purchaseHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="purchases"
                      stroke="#4F46E5"
                      name="Your Purchases"
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#EC4899"
                      name="Market Average"
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              // Recent Orders Table
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stones/Carats
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.stones} stones / {order.totalCarats} cts
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-600">
                          <button className="hover:text-theme-700">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
