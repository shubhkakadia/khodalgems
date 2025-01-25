import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Phone,
  ShoppingCart,
  Star,
  FileText,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import photoplaceholder from "../../assets/diamondImagePlaceholder.webp";

export default function DiamondDetails() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  // Sample diamond data with additional fields
  const diamond = {
    stoneno: "1",
    media: {
      photo: [
        "https://media.lordicon.com/icons/wired/outline/724-diamond-luxury-preciouasds.svg",
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.israelidiamond.co.il%2Fdiamonds-and-jewelry-companies-1%2F12-26-ps-1765139%2F&psig=AOvVaw3DkkT-hwi7uZVDjtzP3Ofl&ust=1733394897868000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDl8av1jYoDFQAAAAAdAAAAABAJ",
      ],
      video: "/api/placeholder/800/800",
    },
    certificateno: "3513413",
    shape: "Pear",
    carat: "2.27",
    color: "J",
    clarity: "VS2",
    price: "20380",
    pricePerCarat: "8977",
    rapPercentage: "-32.5",
    cut: "VG",
    polish: "PR",
    symmetry: "EX",
    fluorescence: "STG",
    lab: "HRD",
    table: "55.3",
    depth: "61.0",
    crown: "14.9",
    pavilion: "43.7",
    length: "8.49",
    width: "8.39",
    height: "5.05",
    ratio: "1.01",
    measurements: "8.49 x 8.39 x 5.05",
    diamondType: "Natural",
    keyToSymbols: "None",
    reportComment: "No comments",
    culet: "None",
    girdle: "Medium to Slightly Thick",
    starLength: "50%",
    inclusions: "VS2 - Small Crystal",
    shade: "None",
    brand: "Generic",
    reportShape: "Pear Brilliant",
    reportDate: "2024-01-15",
    treatment: "None",
    inscription: "HRD 3513413",
  };

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

  const toastConfig = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const addtowishlist = () => {
    if (isInWishlist) {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        pending: "Removing from wishlist...",
        success: `Removed diamond number ${diamond.stoneno} from wishlist`,
        error: "Failed to remove from wishlist",
        ...toastConfig,
      });
      setIsInWishlist(false);
    } else {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        pending: "Adding to wishlist...",
        success: `Added diamond number ${diamond.stoneno} to wishlist`,
        error: "Failed to add to wishlist",
        ...toastConfig,
      });
      setIsInWishlist(true);
    }
  };

  const addtocart = () => {
    if (isInCart) {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        pending: "Removing from cart...",
        success: `Removed diamond number ${diamond.stoneno} from cart`,
        error: "Failed to remove from cart",
        ...toastConfig,
      });
      setIsInCart(false);
    } else {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        pending: "Adding to cart...",
        success: `Added diamond number ${diamond.stoneno} to cart`,
        error: "Failed to add to cart",
        ...toastConfig,
      });
      setIsInCart(true);
    }
  };

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
                {showVideo ? (
                  <video
                    src={diamond.media.video}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={diamond.media.photo[activeImageIndex]}
                      alt={`Diamond view ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = photoplaceholder;
                      }}
                    />
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? diamond.media.photo.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === diamond.media.photo.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {diamond?.media?.photo?.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setShowVideo(false);
                      setActiveImageIndex(index);
                    }}
                    className={`relative h-12 w-12 rounded-lg overflow-hidden ${
                      !showVideo && activeImageIndex === index
                        ? "ring-2 ring-theme-500"
                        : ""
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = photoplaceholder;
                      }}
                    />
                  </button>
                ))}
                <button
                  onClick={() => setShowVideo(true)}
                  className={`relative h-12 w-12 rounded-lg overflow-hidden ${
                    showVideo ? "ring-2 ring-theme-500" : ""
                  }`}
                >
                  <img
                    src={diamond.media.video}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = photoplaceholder;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 max-w-md mx-auto">
                <button
                  onClick={addtocart}
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
                  onClick={addtowishlist}
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
                      {diamond.shape} Diamond {diamond.carat} ct
                    </h1>
                    <p className="text-theme-600">
                      Stone No: {diamond.stoneno}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-theme-700">
                      ${formatNumber(diamond.price)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${formatNumber(diamond.pricePerCarat)}/ct | RAP{" "}
                      {diamond.rapPercentage}%
                    </p>
                  </div>
                </div>
              </div>

              {/* All Details */}
              <div className="flex-1 overflow-y-auto min-h-0">
                <div>
                  {/* Two-column grid for regular details */}
                  <div className="grid grid-cols-2">
                    <Detail label="Shape" value={diamond.shape} />
                    <Detail label="Culet" value={diamond.culet} />
                    <Detail label="Size" value={`${diamond.carat} ct`} />
                    <Detail label="Girdle" value={diamond.girdle} />
                    <Detail label="Color" value={diamond.color} />
                    <Detail label="Crown" value={`${diamond.crown}°`} />
                    <Detail label="Clarity" value={diamond.clarity} />
                    <Detail label="Pavilion" value={`${diamond.pavilion}°`} />
                    <Detail label="Cut" value={diamond.cut} grade={true} />
                    <Detail label="Treatment" value={diamond.treatment} />
                    <Detail
                      label="Polish"
                      value={diamond.polish}
                      grade={true}
                    />
                    <Detail label="Inscription" value={diamond.inscription} />
                    <Detail
                      label="Symmetry"
                      value={diamond.symmetry}
                      grade={true}
                    />
                    <Detail label="Ratio" value={diamond.ratio} />
                    <Detail label="Fluorescence" value={diamond.fluorescence} />
                    <Detail label="Star Length" value={diamond.starLength} />
                    <Detail label="Depth %" value={diamond.depth} />
                    <Detail label="Inclusions" value={diamond.inclusions} />
                    <Detail label="Table %" value={diamond.table} />
                    <Detail label="Shade" value={diamond.shade} />
                    <Detail label="Measurements" value={diamond.measurements} />
                    <Detail label="Brand" value={diamond.brand} />
                    <Detail label="Diamond Type" value={diamond.diamondType} />
                    <Detail label="Report Shape" value={diamond.reportShape} />
                    <Detail label="Report Date" value={diamond.reportDate} />
                  </div>

                  <Detail
                    label="Key to Symbols"
                    value={diamond.keyToSymbols}
                    fullWidth={true}
                  />
                  <Detail
                    label="Supplier Comment"
                    value={diamond.supplierComment || "No supplier comments"}
                    fullWidth={true}
                  />
                  <Detail
                    label="Report Comment"
                    value={diamond.reportComment}
                    fullWidth={true}
                  />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-1.5 bg-theme-600 text-white rounded-lg hover:bg-theme-700 text-sm font-medium">
                  Inquire Now
                </button>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.gia.edu/report-check?reportno=2256789"
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
