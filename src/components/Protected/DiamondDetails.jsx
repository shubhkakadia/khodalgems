import React, { useEffect, useState } from "react";
import { Play, Phone, ShoppingCart, Star, FileText } from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import photoplaceholder from "../../assets/diamondImagePlaceholder.webp";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DiamondDetails() {
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistArray, setWishlistArray] = useState([]);
  const [cartArray, setCartArray] = useState([]);

  const navigate = useNavigate();
  const { number } = useParams();
  const [DiamondDetail, setDiamondDetail] = useState({
    isloading: true,
    success: {},
    error: null,
  });
  const user = useSelector((state) => state.user);

  console.log(number);

  const fetchDiamondDetail = async () => {
    setDiamondDetail({ ...DiamondDetail, isloading: true });
    let data = JSON.stringify({
      stone_no: number,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://${process.env.REACT_APP_SERVER_ADDRESS}/GetStock/SingleStock`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setDiamondDetail({
          ...DiamondDetail,
          isloading: false,
          success: response.data.UserData,
        });
      })
      .catch((error) => {
        console.log(error);
        setDiamondDetail({ ...DiamondDetail, isloading: false, error: error });
      });
  };

  const fetchCartItems = async () => {
    try {
      const config = {
        method: "get",
        url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${user.success.id}/cart`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(config);
      if (response.data.cartItems) {
        setCartArray(response.data.cartItems);
        setIsInCart(
          response.data.cartItems.some((item) => item.stone_no === number)
        );
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
    }
  };

  const addToCart = async () => {
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
        data: { productIds: number },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);

      if (response.data && response.data.message) {
        fetchCartItems();

        toast.success(
          `Diamond with stone no: ${number} added to cart successfully`,
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

  const removeFromCart = async () => {
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
        data: { productIds: number },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);

      if (response.data && response.data.message) {
        fetchCartItems();

        toast.success(
          `Diamond with stone no: ${number} removed from cart successfully`,
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

      if (response.data.wishlistItems) {
        setWishlistArray(response.data.wishlistItems);
        console.log(response.data.wishlistItems);
        setIsInWishlist(
          response.data.wishlistItems.some((item) => item.stone_no === number)
        );
      } else {
        setWishlistArray([]);
      }
    } catch (error) {
      setWishlistArray([]);
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

  const addToWishlist = async () => {
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
        data: { productIds: number },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);
      if (response.data && response.data.message) {
        fetchWishlistItems();

        toast.success(
          `Diamond with stone no: ${number} added to wishlist successfully`,
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

  const removeFromWishlist = async () => {
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
        data: { productIds: number },
      };

      const response = await axios.request(config);
      toast.dismiss(toastId);
      if (response.data && response.data.message) {
        fetchWishlistItems();
        toast.success(
          `Diamond with stone no: ${number} removed from wishlist successfully`,
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

  useEffect(() => {
    fetchDiamondDetail();
    fetchCartItems();
    fetchWishlistItems();
  }, []);

  console.log("DiamondDetail", DiamondDetail);

  const getGradeColor = (grade) => {
    switch (grade) {
      case "EX":
        return "text-green-500";

      default:
        return "text-red-500";
    }
  };

  const Detail = ({ label, value, grade, fullWidth }) => (
    <div
      className={`border-b border-gray-100 py-[2px] px-4 flex gap-3 ${
        fullWidth ? "flex" : "justify-between"
      } hover:bg-slate-200 rounded`}
    >
      <label className="text-gray-500 text-sm font-medium">{label}</label>
      <p
        className={`font-medium text-sm ${
          grade ? getGradeColor(value) : "text-gray-900"
        } ${fullWidth ? "whitespace-pre-wrap" : ""}`}
      >
        {value}
      </p>
    </div>
  );

  const formatNumber = (num) => Number(num).toLocaleString("en-US");

  const handleWishlistToggle = () => {
    const exists = wishlistArray.some(
      (item) => item.stone_no === DiamondDetail?.success[0]?.stone_no
    );

    exists ? removeFromWishlist() : addToWishlist();
  };

  const handleCartToggle = () => {
    // Check if stone exists in wishlistArray
    const exists = cartArray.some(
      (item) => item.stone_no === DiamondDetail?.success[0]?.stone_no
    );
    exists ? removeFromCart() : addToCart();
  };

  console.log(isInCart, isInWishlist);

  return (
    <div className="flex w-full h-screen">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto m-4 space-y-4 w-[85%]">
        {/* Header */}
        <div className="sticky top-0 bg-main-bg z-[5] py-2 flex md:justify-between md:items-center md:flex-row flex-col gap-4">
          <div>
            <h2 className="text-4xl font-semibold pb-4 text-theme-600">
              Diamond Details
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[1300px] mx-auto">
            {/* Left Section - Media */}
            <div className="space-y-2">
              {/* Main Image/Video */}
              <div className="relative w-full max-w-md mx-auto aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={
                    DiamondDetail?.success[0]?.PhotoLink
                      ? DiamondDetail?.success[0]?.PhotoLink
                      : photoplaceholder
                  }
                  alt={`Diamond view`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = DiamondDetail?.success[0]?.PhotoLink;
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                <button
                  className={`relative h-12 w-12 rounded-lg overflow-hidden`}
                >
                  <img
                    src={
                      DiamondDetail?.success[0]?.PhotoLink
                        ? DiamondDetail?.success[0]?.PhotoLink
                        : photoplaceholder
                    }
                    alt={`Thumbnail`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = DiamondDetail?.success[0]?.PhotoLink;
                    }}
                  />
                </button>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href={DiamondDetail?.success[0]?.VedioLink}
                  className={`relative h-12 w-12 rounded-lg overflow-hidden`}
                >
                  <img
                    src={
                      DiamondDetail?.success[0]?.PhotoLink
                        ? DiamondDetail?.success[0]?.PhotoLink
                        : photoplaceholder
                    }
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = DiamondDetail?.success[0]?.PhotoLink;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 max-w-md mx-auto">
                <button
                  onClick={() => handleCartToggle()}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg text-sm transition-all duration-200 ${
                    isInCart
                      ? "bg-theme-600 text-white hover:bg-theme-700 border-theme-600"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <ShoppingCart
                    className={`w-4 h-4 ${isInCart ? "animate-bounce" : ""}`}
                  />
                  <span>{isInCart ? "Remove from Cart" : "Add to Cart"}</span>
                </button>
                <button
                  onClick={() => handleWishlistToggle()}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg text-sm transition-all duration-200 ${
                    isInWishlist
                      ? "bg-yellow-600 text-white hover:bg-yellow-700 border-yellow-600"
                      : "hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      isInWishlist ? "fill-current animate-pulse" : ""
                    }`}
                  />
                  <span>
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
              </div>
            </div>

            {/* Right Section - Details */}
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <h1 className="text-xl font-semibold text-theme-800">
                      {DiamondDetail?.success[0]?.Shape} Diamond{" "}
                      {DiamondDetail?.success[0]?.Carats} ct
                    </h1>
                    <p className="text-theme-600">
                      Stone No: {DiamondDetail?.success[0]?.stone_no}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-theme-700">
                      ${formatNumber(DiamondDetail?.success[0]?.LiveAmount)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${formatNumber(DiamondDetail?.success[0]?.LiveRate)}
                      /ct | RAP {DiamondDetail?.success[0]?.liveraparate}
                    </p>
                  </div>
                </div>
              </div>

              {/* All Details */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div>
                  {/* Two-column grid for regular details */}
                  <div className="grid grid-cols-2">
                    <Detail
                      label="Shape"
                      value={DiamondDetail?.success[0]?.Shape}
                    />
                    <Detail
                      label="Culet"
                      value={DiamondDetail?.success[0]?.CuletSize}
                    />
                    <Detail
                      label="Size"
                      value={`${DiamondDetail?.success[0]?.Carats} ct`}
                    />
                    <Detail
                      label="Girdle"
                      value={DiamondDetail?.success[0]?.GirdlePer}
                    />
                    <Detail
                      label="Color"
                      value={DiamondDetail?.success[0]?.Color}
                    />
                    <Detail
                      label="Crown"
                      value={`${DiamondDetail?.success[0]?.CrownAngle}°`}
                    />
                    <Detail
                      label="Clarity"
                      value={DiamondDetail?.success[0]?.Clarity}
                    />
                    <Detail
                      label="Pavilion"
                      value={`${DiamondDetail?.success[0]?.PavillionAngle}°`}
                    />
                    <Detail
                      label="Cut"
                      value={DiamondDetail?.success[0]?.Cut}
                      grade={true}
                    />
                    <Detail
                      label="Treatment"
                      value={DiamondDetail?.success[0]?.Treatment}
                    />
                    <Detail
                      label="Polish"
                      value={DiamondDetail?.success[0]?.Polish}
                      grade={true}
                    />
                    <Detail
                      label="Inscription"
                      value={DiamondDetail?.success[0]?.Inscription}
                    />
                    <Detail
                      label="Symmetry"
                      value={DiamondDetail?.success[0]?.Symm}
                      grade={true}
                    />
                    <Detail
                      label="Ratio"
                      value={DiamondDetail?.success[0]?.Ratio}
                    />
                    <Detail
                      label="Fluorescence"
                      value={DiamondDetail?.success[0]?.FLR}
                    />
                    <Detail
                      label="Star Length"
                      value={DiamondDetail?.success[0]?.StrLn}
                    />
                    <Detail
                      label="Depth %"
                      value={DiamondDetail?.success[0]?.DepthPer}
                    />
                    <Detail
                      label="Inclusions"
                      value={DiamondDetail?.success[0]?.inclusions}
                    />
                    <Detail
                      label="Table %"
                      value={DiamondDetail?.success[0]?.TableSize}
                    />
                    <Detail
                      label="Shade"
                      value={DiamondDetail?.success[0]?.Shade}
                    />
                    <Detail
                      label="Measurements"
                      value={DiamondDetail?.success[0]?.measurement}
                    />
                    <Detail
                      label="Brand"
                      value={DiamondDetail?.success[0]?.brand}
                    />
                    <Detail
                      label="Diamond Type"
                      value={DiamondDetail?.success[0]?.diamondType}
                    />
                    <Detail
                      label="Report Date"
                      value={DiamondDetail?.success[0]?.ReportDate}
                    />
                  </div>

                  <Detail
                    label="Key to Symbols"
                    value={DiamondDetail?.success[0]?.KeytoSymbols}
                    fullWidth={true}
                  />
                  <Detail
                    label="Supplier Comment"
                    value={
                      DiamondDetail?.success[0]?.MemberComment ||
                      "No supplier comments"
                    }
                    fullWidth={true}
                  />
                  <Detail
                    label="Report Comment"
                    value={DiamondDetail?.success[0]?.ReportComments}
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-2 mt-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={DiamondDetail?.success[0]?.CertificateLink}
                  className="flex items-center justify-center gap-1 px-3 py-1.5 border rounded-lg hover:bg-gray-50 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Report</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
