import React, { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import {
  Phone,
  Search,
  Calendar,
  ChevronDown,
  Download,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrderHistory() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample order data
  const orders = [
    {
      id: "ORD-2024-015",
      date: "2024-02-15",
      stones: 3,
      totalCarats: "6.82",
      amount: 18465,
      status: "Processing",
      paymentStatus: "Pending",
      details: [
        { stoneno: "ST125", carat: "2.31", price: 6240 },
        { stoneno: "ST126", carat: "2.15", price: 5825 },
        { stoneno: "ST127", carat: "2.36", price: 6400 },
      ],
    },
    {
      id: "ORD-2024-016",
      date: "2024-03-04",
      stones: 4,
      totalCarats: "8.56",
      amount: 22780,
      status: "Shipped",
      paymentStatus: "Paid",
      details: [
        { stoneno: "ST145", carat: "2.12", price: 5650 },
        { stoneno: "ST146", carat: "2.18", price: 5780 },
        { stoneno: "ST147", carat: "2.05", price: 5450 },
        { stoneno: "ST148", carat: "2.21", price: 5900 },
      ],
    },
    {
      id: "ORD-2024-017",
      date: "2024-02-28",
      stones: 2,
      totalCarats: "4.35",
      amount: 11890,
      status: "Delivered",
      paymentStatus: "Paid",
      details: [
        { stoneno: "ST152", carat: "2.15", price: 5940 },
        { stoneno: "ST153", carat: "2.20", price: 5950 },
      ],
    },
    {
      id: "ORD-2024-018",
      date: "2024-03-05",
      stones: 5,
      totalCarats: "10.85",
      amount: 28950,
      status: "Processing",
      paymentStatus: "Partially Paid",
      details: [
        { stoneno: "ST161", carat: "2.18", price: 5800 },
        { stoneno: "ST162", carat: "2.15", price: 5750 },
        { stoneno: "ST163", carat: "2.22", price: 5900 },
        { stoneno: "ST164", carat: "2.12", price: 5700 },
        { stoneno: "ST165", carat: "2.18", price: 5800 },
      ],
    },
    {
      id: "ORD-2024-019",
      date: "2024-03-02",
      stones: 3,
      totalCarats: "6.58",
      amount: 17685,
      status: "Confirmed",
      paymentStatus: "Pending",
      details: [
        { stoneno: "ST171", carat: "2.18", price: 5875 },
        { stoneno: "ST172", carat: "2.25", price: 6010 },
        { stoneno: "ST173", carat: "2.15", price: 5800 },
      ],
    },
  ];

  // Filter orders by date period
  const filterOrdersByPeriod = (orders, period) => {
    const today = new Date();
    const orderDate = (dateStr) => new Date(dateStr);

    switch (period) {
      case "today":
        return orders.filter(
          (order) =>
            orderDate(order.date).toDateString() === today.toDateString()
        );
      case "week":
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        return orders.filter((order) => orderDate(order.date) >= weekAgo);
      case "month":
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        return orders.filter((order) => orderDate(order.date) >= monthAgo);
      case "year":
        const yearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
        return orders.filter((order) => orderDate(order.date) >= yearAgo);
      default:
        return orders;
    }
  };

  // Search orders by ID or stone numbers
  const searchOrders = (orders, term) => {
    const searchLower = term.toLowerCase();
    return orders.filter((order) => {
      // Search in order ID
      if (order.id.toLowerCase().includes(searchLower)) return true;

      // Search in stone numbers
      return order.details.some((detail) =>
        detail.stoneno.toLowerCase().includes(searchLower)
      );
    });
  };

  // Combine filters and search
  const filteredOrders = useMemo(() => {
    let result = orders;

    // Apply date filter
    result = filterOrdersByPeriod(result, selectedPeriod);

    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      result = searchOrders(result, searchTerm);
    }

    return result;
  }, [orders, selectedPeriod, searchTerm]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "bg-green-100 text-green-800",
      Processing: "bg-blue-100 text-blue-800",
      Confirmed: "bg-yellow-100 text-yellow-800",
      Shipped: "bg-purple-100 text-purple-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status) => {
    return status === "Paid"
      ? "text-green-600"
      : status === "Partially Paid"
      ? "text-yellow-600"
      : "text-red-600";
  };

  const downloadInvoice = (orderId) => {
    console.log("Downloading invoice for order:", orderId);
    // Download invoice logic here
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto m-4 space-y-4 w-[85%] h-full">
        {/* Header */}
        <div className="sticky top-0 bg-main-bg z-[5] py-2 flex md:justify-between md:items-center md:flex-row flex-col gap-4">
          <div>
            <h2 className="text-4xl font-semibold pb-4 text-theme-600">
              Order History
            </h2>
          </div>

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

        {/* Filters Row */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="pl-10 pr-4 py-1.5 border rounded-lg appearance-none focus:ring-2 focus:ring-theme-500 text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order ID or Stone No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1.5 border rounded-lg w-64 focus:ring-2 focus:ring-theme-500 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Order Details
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            setExpandedOrder(
                              expandedOrder === order.id ? null : order.id
                            )
                          }
                          className="mr-2 text-gray-400 hover:text-gray-600 dark:text-gray-300"
                        >
                          <ChevronRight
                            className={`h-4 w-4 transform transition-transform ${
                              expandedOrder === order.id ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                        <div>
                          <div className="font-medium text-gray-900">
                            {order.id}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {order.stones} stones • {order.totalCarats} cts
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span
                          className={`text-xs font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="text-sm font-medium text-gray-900">
                        ${formatNumber(order.amount)}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex justify-center gap-2">
                        {/* <button
                          onClick={() => navigate(`/order/${order.id}`)}
                          className="text-theme-600 hover:text-theme-700"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button> */}
                        <button
                          title="Download Invoice"
                          onClick={() => downloadInvoice(order.id)}
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-700"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-4 py-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {order.details.map((detail, index) => (
                            <div
                              key={index}
                              className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                            >
                              <div className="font-medium text-gray-900">
                                Stone {detail.stoneno}
                              </div>
                              <div className="text-gray-500 dark:text-gray-400">
                                {detail.carat} cts • $
                                {formatNumber(detail.price)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No orders found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
