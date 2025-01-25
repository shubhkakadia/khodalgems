import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import diamond from "../../assets/round.png";
import { ChevronLeft, ChevronRight, Phone, Sheet, Star } from "lucide-react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSuccess, setError } from "../state/stockAPI.js";
import axios from "axios";
import Loader from "./Loader";

export default function Stones() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [favToggled, setFavToggled] = useState({});
  const [cartToggled, setCartToggled] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [tableHeight, setTableHeight] = useState(500);
  const [cartArray, setCartArray] = useState([]);
  const [wishlistArray, setWishlistArray] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc",
  });
  const stock = useSelector((state) => state.stock);
  const user = useSelector((state) => state.user);

  const clarityOrder = [
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "I1",
    "I2",
    "I3",
  ];
  const colorOrder = [
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const cutOrder = ["EX", "VG", "GD", "FR", "PR", "ID", ""];
  const fluorescenceOrder = ["None", "VSL", "SLT", "FNT", "MED", "STG", "VST"];

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows =
    rowsPerPage === "All"
      ? stock?.success
      : stock?.success?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages =
    rowsPerPage === "All" ? 1 : Math.ceil(stock.success?.length / rowsPerPage);

  useEffect(() => {
    // Function to log the screen height
    const logScreenHeight = () => {
      setTableHeight(window.innerHeight * 0.8); // Example: 50% of screen height
    };

    // Log the initial screen height
    logScreenHeight();

    // Add the resize event listener
    window.addEventListener("resize", logScreenHeight);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", logScreenHeight);
    };
  }, []);

  const fetchCartItems = async () => {
    try {
      dispatch(setLoading(true));

      const config = {
        method: "get",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(config);

      if (response.data && response.data.cartItems) {
        setCartArray(response.data.cartItems);
      } else {
        setCartArray([]);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      setCartArray([]);

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const addToCart = async (productIds) => {
    const toastId = toast.loading("Adding to cart...", {
      position: "top-right",
    });
    try {
      const config = {
        method: "post",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        data: { productIds },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);

      if (response.data && response.data.message) {
        fetchCartItems();

        toast.success(
          `Diamond with stone no: ${productIds} added to cart successfully`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        throw new Error("Failed to add products to cart");
      }
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const removeFromCart = async (productIds) => {
    const toastId = toast.loading("Adding to cart...", {
      position: "top-right",
    });
    try {
      const config = {
        method: "delete",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        data: { productIds },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);

      if (response.data && response.data.message) {
        fetchCartItems();

        toast.success(
          `Diamond with stone no: ${productIds} removed from cart successfully`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        throw new Error("Failed to remove products from cart");
      }
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Wishlist Functions
  const fetchWishlistItems = async () => {
    try {
      const config = {
        method: "get",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(config);

      if (response.data && response.data.wishlistItems) {
        setWishlistArray(response.data.wishlistItems);
      } else {
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const addToWishlist = async (productIds) => {
    const toastId = toast.loading("Adding to cart...", {
      position: "top-right",
    });
    try {
      const config = {
        method: "post",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        data: { productIds },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);
      if (response.data && response.data.message) {
        fetchWishlistItems();

        toast.success(
          `Diamond with stone no: ${productIds} added to wishlist successfully`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        throw new Error("Failed to add products to wishlist");
      }
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const removeFromWishlist = async (productIds) => {
    const toastId = toast.loading("Adding to cart...", {
      position: "top-right",
    });
    try {
      const config = {
        method: "delete",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/wishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        data: { productIds },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);
      if (response.data && response.data.message) {
        fetchWishlistItems();
        toast.success(
          `Diamond with stone no: ${productIds} removed from wishlist successfully`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } else {
        throw new Error("Failed to remove products from wishlist");
      }
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

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
    const fetchData = async () => {
      await fetchCartItems();
      await fetchWishlistItems();
      await fetchStock();
    };

    fetchData();
  }, []);

  // Handle checkbox change
  const handleSelection = (stone) => {
    setSelected((prev) => {
      // Check if the stone is already in the selected list
      const isAlreadySelected = prev.some(
        (selectedStone) => selectedStone.stone_no === stone.stone_no
      );

      if (isAlreadySelected) {
        // If already selected, remove it
        return prev.filter(
          (selectedStone) => selectedStone.stone_no !== stone.stone_no
        );
      } else {
        // If not selected, add it
        return [...prev, stone];
      }
    });
  };

  const toggleSelectAll = () => {
    const areAllSelected = currentRows.every((stone) =>
      selected.some((selectedStone) => selectedStone.stoneno === stone.stoneno)
    );

    if (areAllSelected) {
      // Deselect all items on the current page
      setSelected((prev) =>
        prev.filter(
          (selectedStone) =>
            !currentRows.some(
              (stone) => stone.stoneno === selectedStone.stoneno
            )
        )
      );
    } else {
      // Select all unique items on the current page
      const currentPageStones = currentRows.filter(
        (stone) =>
          !selected.some(
            (selectedStone) => selectedStone.stoneno === stone.stoneno
          )
      );

      setSelected((prev) => [...prev, ...currentPageStones]);
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const memoizedCalculations = useMemo(() => {
    // Total Pieces
    const totalPieces = selected.length;

    // Total Carat
    const totalCarat = selected
      .reduce((sum, stone) => sum + parseFloat(stone.Carats || 0), 0)
      .toFixed(2);

    // Total Price
    const totalPrice = selected
      .reduce((sum, stone) => sum + parseFloat(stone.LiveAmount || 0), 0)
      .toFixed(2);

    // Total Rap
    const totalRap = selected
      .reduce((sum, stone) => sum + parseFloat(stone.liveraparate || 0), 0)
      .toFixed(2);

    // Calculate total discount amount
    const totalDiscountAmount = selected
      .reduce((sum, stone) => {
        const price = parseFloat(stone.LiveAmount || 0);
        const discount = parseFloat(stone.LiveDiscount || 0);
        return sum + (price * discount) / 100;
      }, 0)
      .toFixed(2);

    // Calculate total discount percentage
    const totalDiscount =
      totalPrice > 0
        ? ((totalDiscountAmount / parseFloat(totalPrice)) * 100).toFixed(2)
        : "0.00";

    return {
      totalPieces,
      totalCarat,
      totalPrice,
      totalRap,
      totalDiscount,
    };
  }, [selected]);

  const { totalPieces, totalCarat, totalPrice, totalRap, totalDiscount } =
    memoizedCalculations;

  // Export selected stones to Excel
  const exportToExcel = () => {
    if (selected.length === 0) {
      alert("No stones selected to export!");
      return;
    }

    // Prepare data for Excel
    const data = selected.map((stone) => ({
      "Stone No": stone.stoneno,
      "Certificate No": stone.certificateno,
      Shape: stone.shape,
      Carat: stone.carat,
      Color: stone.color,
      Clarity: stone.clarity,
      Price: stone.price,
      Rap: stone.rap,
      Discount: stone.disc,
      "$/Carat": stone.pricepercarat || 0,
      Cut: stone.cut,
      Polish: stone.polish,
      Symmetry: stone.symmetry,
      Fluorescence: stone.fluorescence,
      Lab: stone.lab,
      Comment: stone.comment,
      "Eye Clean": stone.eye,
      "Table%": stone.table,
      "Depth%": stone.depth,
      "Crown%": stone.crown,
      "Pavilion%": stone.pavilion,
      Length: stone.length,
      Width: stone.width,
      Height: stone.height,
      Gurdle: stone.gurdle,
      Culet: stone.culet,
      Ratio: stone.ratio,
      Location: stone.location,
    }));

    data.push(
      {},
      {
        "Stone No": "TOTALS",
        "Certificate No": "",
        Shape: "",
        Carat: totalCarat,
        Color: "",
        Clarity: "",
        Price: totalPrice,
        Rap: totalRap,
        Discount: `${totalDiscount}%`,
        "$/Carat": "",
        Cut: "",
        Polish: "",
        Symmetry: "",
        Fluorescence: "",
        Lab: "",
        Comment: "",
        "Eye Clean": "",
        "Table%": "",
        "Depth%": "",
        "Crown%": "",
        "Pavilion%": "",
        Length: "",
        Width: "",
        Height: "",
        Gurdle: "",
        Culet: "",
        Ratio: "",
        Location: "",
      }
    );

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Stones");

    // Get current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "-"); // DD-MM-YYYY
    const formattedTime = now.toLocaleTimeString("en-GB").replace(/:/g, ":"); // HH:MM:SS

    // Generate Excel file with dynamic name
    const filename = `khodalgems stock ${formattedDate} ${formattedTime}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const customSort = (data, column, direction) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      // Handle specific column sorting
      if (column === "Clarity") {
        aValue = clarityOrder.indexOf(aValue);
        bValue = clarityOrder.indexOf(bValue);
      } else if (column === "Color") {
        aValue = colorOrder.indexOf(aValue);
        bValue = colorOrder.indexOf(bValue);
      } else if (
        column === "Carats" ||
        column === "LiveRate" ||
        column === "LiveAmount" ||
        column === "liveraparate"
      ) {
        aValue = parseFloat(aValue || 0);
        bValue = parseFloat(bValue || 0);
      } else if (["Cut", "Polish", "Symm"].includes(column)) {
        aValue = cutOrder.indexOf(aValue);
        bValue = cutOrder.indexOf(bValue);
      } else if (column === "FLR") {
        aValue = fluorescenceOrder.indexOf(aValue);
        bValue = fluorescenceOrder.indexOf(bValue);
      } else if (["LiveDiscount", "TableBlack", "SideBlack"].includes(column)) {
        // Numeric sorting
        aValue = parseFloat(aValue || 0);
        bValue = parseFloat(bValue || 0);
      } else if (column === "stone_no") {
        // Numeric sorting for IDs
        aValue = parseInt(aValue || 0, 10);
        bValue = parseInt(bValue || 0, 10);
      } else if (
        ["Shape", "LAB", "Location", "Shade", "CertificateNo"].includes(column)
      ) {
        // Alphabetical sorting
        aValue = (aValue || "").toString().toLowerCase();
        bValue = (bValue || "").toString().toLowerCase();
      } else {
        // Default case for any unhandled columns
        return 0;
      }

      // Compare values based on direction
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  const usePaginatedAndSortedData = (
    data,
    currentPage,
    rowsPerPage,
    sortConfig
  ) => {
    return useMemo(() => {
      let processedData = [...(data || [])];

      // Apply sorting first
      if (sortConfig.column) {
        processedData = customSort(
          processedData,
          sortConfig.column,
          sortConfig.direction
        );
      }

      // Then apply pagination
      if (rowsPerPage !== "All") {
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        processedData = processedData.slice(indexOfFirstRow, indexOfLastRow);
      }

      return processedData;
    }, [data, currentPage, rowsPerPage, sortConfig]);
  };

  const handleSort = (column) => {
    setSortConfig((prev) => {
      const direction =
        prev.column === column && prev.direction === "asc" ? "desc" : "asc";
      return { column, direction };
    });
  };

  // Toast configuration
  const toastConfig = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const addtowishlistfunction = async () => {
    if (selected.length === 0) {
      toast.error("Please select stones to add to wishlist", toastConfig);
      return;
    }

    await addToWishlist(selected.map((stone) => stone.stone_no).join(", "));
    setSelected([]);
  };

  const addtocartfunction = async () => {
    if (selected.length === 0) {
      toast.error("Please select stones to add to cart", toastConfig);
      return;
    }
    await addToCart(selected.map((stone) => stone.stone_no).join(", "));
    // setSelected([]);
  };

  const handleWishlistToggle = (stoneNo) => {
    // Check if stone exists in wishlistArray
    const exists = wishlistArray.some((item) => item.stone_no === stoneNo);

    exists ? removeFromWishlist(stoneNo) : addToWishlist(stoneNo);
  };

  const handleCartToggle = (stoneNo) => {
    // Check if stone exists in wishlistArray
    const exists = cartArray.some((item) => item.stone_no === stoneNo);

    exists ? removeFromCart(stoneNo) : addToCart(stoneNo);
  };

  const sortedData = usePaginatedAndSortedData(
    stock.success,
    currentPage,
    rowsPerPage,
    sortConfig
  );

  return (
    <div className="flex w-full h-full">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto w-[85%] h-screen flex flex-col">
        <div className="p-4 sticky top-0 z-[5] bg-main-bg flex md:justify-between md:items-center md:flex-row flex-col gap-2">
          <div>
            <h2 className="text-4xl font-semibold text-theme-600">Stones</h2>
            <Link
              to={"/search"}
              className="text-md font-semibold text-theme-600 underline"
            >
              modify search
            </Link>
          </div>

          {/* Totals */}
          {selected.length > 0 && (
            <div className="md:flex justify-center bg-main-bg gap-20">
              <div className="flex overflow-auto md:flex-row flex-col md:py-0 py-2">
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-theme-600 w-32">
                    Total Pieces: {totalPieces}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-theme-600 w-[150px]">
                    Total Carat: {totalCarat}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-theme-600 w-[200px]">
                    Total Price: ${formatNumber(totalPrice)}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-theme-600 w-[175px]">
                    Total Rap: {formatNumber(totalRap)}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-semibold text-theme-600 w-[150px]">
                    Discount: {totalDiscount}%
                  </p>
                </div>
              </div>

              <div>
                <div className="flex gap-4 justify-center items-center">
                  {/* Add to Cart Button */}
                  <div className="flex justify-center">
                    <button
                      title="Add to Cart"
                      onClick={addtocartfunction}
                      className="bg-theme-500 md:text-sm text-xs text-white p-2 rounded-md hover:bg-theme-600"
                    >
                      <IoCartOutline size={20} />
                    </button>
                  </div>
                  {/* Add to Wishlist Button */}
                  <div className="flex justify-center">
                    <button
                      title="Add to Wishlist"
                      onClick={addtowishlistfunction}
                      className="bg-theme-500 md:text-sm text-xs text-white p-2 rounded-md hover:bg-theme-600"
                    >
                      <TiStarOutline size={20} />
                    </button>
                  </div>
                  {/* Export to Excel Button */}
                  <div className="flex justify-center">
                    <button
                      title="Export to Excel"
                      onClick={exportToExcel}
                      className="bg-[#3E8F62] flex items-center gap-2 md:text-sm text-xs text-white p-2 rounded-md hover:bg-[#1D6F42]"
                    >
                      <Sheet className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => navigate("/contactus")}
            className="flex items-center px-4 py-2 relative animate-[attention_1s_ease-in-out_infinite] hover:bg-theme-300 hover:animate-none rounded-md hover:text-white transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            <span>Contact Us</span>
            <style jsx global>{`
              @keyframes attention {
                0% {
                  color: rgb(75 85 99); /* text-gray-600 dark:text-gray-300 */
                }
                50% {
                  color: rgb(79 70 229); /* text-theme-600 */
                }
                100% {
                  color: rgb(75 85 99); /* text-gray-600 dark:text-gray-300 */
                }
              }
            `}</style>
          </button>
        </div>

        <div className="flex-1">
          {/* Table */}
          {stock.loding ? (
            <div>
              <Loader />
            </div>
          ) : stock.error ? (
            <div className="flex justify-center items-center text-red-500">
              <div className="text-center">
                <h2>Error Loading Stones</h2>
                <p>{stock.error}</p>
                <button
                  onClick={fetchStock}
                  className="mt-4 px-4 py-2 bg-theme-500 text-white rounded"
                >
                  Retry Fetch
                </button>
              </div>
            </div>
          ) : (
            <div>
              {sortedData.length > 0 ? (
                <div>
                  <div
                    className={`mx-4 h-[${500}px] overflow-x-auto overflow-y-auto transition-all duration-300 ease-in-out`}
                  >
                    <table className="table-auto border-collapse border border-gray-300 w-full sortable">
                      <thead>
                        <tr className="bg-gray-100 sticky top-0 border border-gray-300 cursor-pointer">
                          <th className="border border-gray-300 px-2 py-2 min-w-[100px] flex justify-around items-center">
                            Select{" "}
                            <input
                              type="checkbox"
                              checked={sortedData.every((stone) =>
                                selected.some(
                                  (item) => item.stone_no === stone.stone_no
                                )
                              )}
                              onChange={toggleSelectAll}
                              className="cursor-pointer"
                            />
                          </th>
                          <th className="border border-gray-300 px-2 py-2">
                            Actions
                          </th>
                          <th className="border border-gray-300 px-2 cursor-pointer min-w-[100px]">
                            Stone No{" "}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                            onClick={() => handleSort("LAB")}
                          >
                            Lab{" "}
                            {sortConfig.column === "lab" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th className="border border-gray-300 px-2 py-2 min-w-[125px]">
                            Certificate No
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                            onClick={() => handleSort("Shape")}
                          >
                            Shape{" "}
                            {sortConfig.column === "Shape" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                            onClick={() => handleSort("Carats")}
                          >
                            Carat{" "}
                            {sortConfig.column === "Carats" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            onClick={() => handleSort("Color")}
                            className="border border-gray-300 px-2 cursor-pointer min-w-[175px]"
                          >
                            Color{" "}
                            {sortConfig.column === "Color" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            onClick={() => handleSort("Clarity")}
                            className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                          >
                            Clarity{" "}
                            {sortConfig.column === "Clarity" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                            onClick={() => handleSort("Cut")}
                          >
                            Cut{" "}
                            {sortConfig.column === "Cut" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                            onClick={() => handleSort("Polish")}
                          >
                            Polish{" "}
                            {sortConfig.column === "Polish" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[125px]"
                            onClick={() => handleSort("Symm")}
                          >
                            Symmetry{" "}
                            {sortConfig.column === "Symm" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[130px]"
                            onClick={() => handleSort("FLR")}
                          >
                            Fluorescence{" "}
                            {sortConfig.column === "FLR" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th className="border border-gray-300 px-2 cursor-pointer  min-w-[150px]">
                            Measurement{" "}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                            onClick={() => handleSort("TableSize")}
                          >
                            Table%{" "}
                            {sortConfig.column === "TableSize" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                            onClick={() => handleSort("DepthPer")}
                          >
                            Depth%{" "}
                            {sortConfig.column === "DepthPer" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer  min-w-[150px]"
                            onClick={() => handleSort("Shade")}
                          >
                            Shade{" "}
                            {sortConfig.column === "Shade" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th className="border border-gray-300 px-2 cursor-pointer  min-w-[50px]">
                            TB{" "}
                          </th>
                          <th className="border border-gray-300 px-2 cursor-pointer  min-w-[50px]">
                            SB{" "}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[125px]"
                            onClick={() => handleSort("liveraparate")}
                          >
                            Rapa Rate{" "}
                            {sortConfig.column === "liveraparate" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                            onClick={() => handleSort("LiveDiscount")}
                          >
                            Discount{" "}
                            {sortConfig.column === "LiveDiscount" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                            onClick={() => handleSort("LiveRate")}
                          >
                            Rate{" "}
                            {sortConfig.column === "LiveRate" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                            onClick={() => handleSort("LiveAmount")}
                          >
                            Amount{" "}
                            {sortConfig.column === "LiveAmount" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                          <th
                            className="border border-gray-300 px-2 cursor-pointer min-w-[150px]"
                            onClick={() => handleSort("Location")}
                          >
                            Location{" "}
                            {sortConfig.column === "Location" &&
                              (sortConfig.direction === "asc" ? "↑" : "↓")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedData.map((stone, index) => {
                          const isSelected = selected.some(
                            (item) => item.stone_no === stone.stone_no
                          );
                          return (
                            <tr
                              key={index}
                              className={`cursor-pointer ${
                                isSelected
                                  ? "bg-theme-100"
                                  : index % 2 === 0
                                  ? "bg-white"
                                  : "bg-gray-50"
                              } hover:bg-theme-200 transition-all duration-50 ease-in-out`}
                            >
                              <td className="text-sm border border-gray-300 px-2 py-1 text-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleSelection(stone)}
                                  className="cursor-pointer"
                                />
                              </td>
                              <td className="border border-gray-300">
                                <div className="flex justify-around items-center">
                                  {/* Favorite Button */}
                                  <button
                                    className="text-theme-600 hover:text-theme-900"
                                    onClick={() =>
                                      handleWishlistToggle(stone.stone_no)
                                    }
                                  >
                                    {wishlistArray.some(
                                      (item) => item.stone_no === stone.stone_no
                                    ) ? (
                                      <TiStarFullOutline size={20} />
                                    ) : (
                                      <TiStarOutline size={20} />
                                    )}
                                  </button>
                                  {/* Cart Button */}
                                  <button
                                    className="text-theme-600 hover:text-theme-900"
                                    onClick={() =>
                                      handleCartToggle(stone.stone_no)
                                    }
                                  >
                                    {cartArray.some(
                                      (item) => item.stone_no === stone.stone_no
                                    ) ? (
                                      <IoCartSharp size={20} />
                                    ) : (
                                      <IoCartOutline size={20} />
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right underline">
                                <Link
                                  target="_blank"
                                  to={`/stonedetails/${stone.stone_no}`}
                                  className="text-theme-600 hover:underline"
                                >
                                  {stone.stone_no}
                                </Link>
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.LAB}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right underline">
                                <Link
                                  target="_blank"
                                  to={`${stone.CertificateLink}`}
                                  className="text-theme-600 hover:underline"
                                >
                                  {stone.CertificateNo}
                                </Link>
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Shape}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right">
                                {stone.Carats}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Color}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Clarity}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Cut}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Polish}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Symm}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.FLR}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.measurement}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.TableSize}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.DepthPer}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Shade}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.TableBlack}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.SideBlack}
                              </td>

                              <td className="text-sm border border-gray-300 px-2 text-right">
                                ${formatNumber(stone.liveraparate.toFixed(2))}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right">
                                {stone.LiveDiscount}%
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right">
                                ${formatNumber(stone.LiveRate.toFixed(2))}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-right">
                                ${formatNumber(stone.LiveAmount.toFixed(2))}
                              </td>
                              <td className="text-sm border border-gray-300 px-2 text-center">
                                {stone.Location}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    {sortedData.length > 0 && (
                      <div>
                        {/* Pagination */}
                        <div className="flex flex-col bg-main-bg border-t border-gray-100 dark:border-gray-700 p-2 px-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between items-start gap-4">
                            {/* Rows per page dropdown - Responsive */}
                            <div className="flex items-center">
                              <label
                                htmlFor="rowsPerPage"
                                className="text-sm font-medium text-gray-600 dark:text-gray-300"
                              >
                                Show
                              </label>
                              <select
                                id="rowsPerPage"
                                value={rowsPerPage}
                                onChange={(e) => {
                                  const value =
                                    e.target.value === "All"
                                      ? "All"
                                      : parseInt(e.target.value);
                                  setRowsPerPage(value);
                                  setCurrentPage(1);
                                }}
                                className="mx-2 h-9 w-16 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 text-sm focus:border-theme-500 focus:ring-theme-500"
                              >
                                {/* <option value={25}>25</option> */}
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={"All"}>All</option>
                              </select>
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                entries
                              </span>
                            </div>

                            {/* Pagination Navigation - Responsive */}
                            {rowsPerPage !== "All" && (
                              <div className="flex items-center gap-1.5 order-3 sm:order-2 w-full sm:w-auto justify-center">
                                {/* Previous Button */}
                                <button
                                  disabled={currentPage === 1}
                                  onClick={() =>
                                    setCurrentPage((prev) =>
                                      Math.max(prev - 1, 1)
                                    )
                                  }
                                  className={`h-9 px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
        ${
          currentPage === 1
            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
            : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200 dark:border-gray-700"
        }`}
                                >
                                  <ChevronLeft className="h-5 w-5 block sm:hidden" />
                                  <span className="hidden sm:block">
                                    Previous
                                  </span>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1.5">
                                  {Array.from(
                                    { length: totalPages },
                                    (_, i) => i + 1
                                  )
                                    .filter((page) => {
                                      const isMobile = window.innerWidth < 640;

                                      if (isMobile) {
                                        return (
                                          page === 1 ||
                                          page === totalPages ||
                                          page === currentPage ||
                                          page === currentPage - 1 ||
                                          page === currentPage + 1
                                        );
                                      } else {
                                        return (
                                          page === 1 ||
                                          page === totalPages ||
                                          page === currentPage ||
                                          page === currentPage - 1 ||
                                          page === currentPage - 2 ||
                                          page === currentPage + 1 ||
                                          page === currentPage + 2
                                        );
                                      }
                                    })
                                    .map((page, index, array) => (
                                      <React.Fragment key={page}>
                                        {index > 0 &&
                                          array[index - 1] !== page - 1 && (
                                            <span className="px-0.5 text-gray-400">
                                              ...
                                            </span>
                                          )}
                                        <button
                                          onClick={() => setCurrentPage(page)}
                                          className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${
                  currentPage === page
                    ? "bg-theme-600 text-white"
                    : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200 dark:border-gray-700"
                }`}
                                        >
                                          {page}
                                        </button>
                                      </React.Fragment>
                                    ))}
                                </div>

                                {/* Next Button */}
                                <button
                                  disabled={currentPage === totalPages}
                                  onClick={() =>
                                    setCurrentPage((prev) =>
                                      Math.min(prev + 1, totalPages)
                                    )
                                  }
                                  className={`h-9 px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
        ${
          currentPage === totalPages
            ? "bg-gray-50 text-gray-400 cursor-not-allowed"
            : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200 dark:border-gray-700"
        }`}
                                >
                                  <ChevronRight className="h-5 w-5 block sm:hidden" />
                                  <span className="hidden sm:block">Next</span>
                                </button>
                              </div>
                            )}

                            {/* Results Counter - Responsive */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 order-2 sm:order-3">
                              {rowsPerPage === "All" ? (
                                <span>
                                  Showing all{" "}
                                  <span className="font-medium">
                                    {stock.success?.length}
                                  </span>{" "}
                                  entries
                                </span>
                              ) : (
                                <>
                                  <span className="font-medium">
                                    {Math.min(
                                      indexOfFirstRow + 1,
                                      stock.success?.length
                                    )}
                                    -
                                    {Math.min(
                                      indexOfLastRow,
                                      stock.success?.length
                                    )}
                                  </span>{" "}
                                  of{" "}
                                  <span className="font-medium">
                                    {stock.success?.length}
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="flex gap-4 items-center">
                    <img src={diamond} alt="Diamond" />
                    <div>
                      <h1 className="font-quicksand text-center text-gray-600 dark:text-gray-300 font-semibold">
                        Sorry!
                      </h1>
                      <span className="font-quicksand text-center text-gray-400 font-semibold">
                        No stones found
                      </span>
                    </div>
                    <img src={diamond} alt="Diamond" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
