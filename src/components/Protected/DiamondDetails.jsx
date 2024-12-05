import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Phone,
  ShoppingCart,
  Star,
} from 'lucide-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DiamondDetails() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');
  const navigate = useNavigate();

  // Sample diamond data
  const diamond = {
    stoneno: "1",
    media: {
      photo: ["https://www.google.com/imgres?q=peer%20diamond&imgurl=https%3A%2F%2Fwww.brilliance.com%2Fcdn-cgi%2Fimage%2Ff%3Dwebp%2Cwidth%3D720%2Cheight%3D720%2Cquality%3D90%2Fsites%2Fdefault%2Ffiles%2Fengagement-rings%2F4.5x3-pear-diamond-premium%2F4.5x3.0-pear-diamond-premium-melee-diamonds-v1.jpg&imgrefurl=https%3A%2F%2Fwww.brilliance.com%2Fmelee-diamond%2F4.5x3-pear-diamond-premium&docid=vtzAb-ZMl6IOXM&tbnid=D8cdAfK2UHCxAM&vet=12ahUKEwjUq9up9Y2KAxUByDgGHZY7LKUQM3oECEwQAA..i&w=720&h=720&hcb=2&ved=2ahUKEwjUq9up9Y2KAxUByDgGHZY7LKUQM3oECEwQAA", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.israelidiamond.co.il%2Fdiamonds-and-jewelry-companies-1%2F12-26-ps-1765139%2F&psig=AOvVaw3DkkT-hwi7uZVDjtzP3Ofl&ust=1733394897868000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDl8av1jYoDFQAAAAAdAAAAABAJ"],
      video: "/api/placeholder/800/800"
    },
    certificateno: "3513413",
    shape: "Pear",
    carat: "2.27",
    color: "J",
    clarity: "VS2",
    price: "20380",
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
  };
  

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'EX': return 'text-green-600';
      case 'VG': return 'text-theme-600';
      case 'G': return 'text-yellow-600';
      case 'F': return 'text-orange-600';
      case 'PR': return 'text-red-600';
      case 'STG': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const Detail = ({ label, value, grade }) => (
    <div>
      <label className="text-theme-500 text-xs">{label}</label>
      <p className={`font-medium ${grade ? getGradeColor(value) : 'text-gray-900'}`}>
        {value}
      </p>
    </div>
  );

  const formatNumber = (num) => Number(num).toLocaleString('en-US');

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

    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      pending: "Adding to wishlist...",
      success: `Added diamond number ${diamond.stoneno} to wishlist`,
      error: "Failed to add to wishlist",
      ...toastConfig,
    });

  };

  const addtocart = () => {
    // Simulate API delay
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
      pending: "Adding to cart...",
      success: `Added diamond number ${diamond.stoneno} to cart`,
      error: "Failed to add to cart",
      ...toastConfig,
    });
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
            onClick={() => navigate("/contact")}
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
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {/* Left Section - Media */}
            <div className="space-y-2">
              {/* Main Image/Video */}
              <div className="relative w-full max-w-md mx-auto aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {showVideo ? (
                  <video src={diamond.media.video} controls className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img
                      src={diamond.media.photo[activeImageIndex]}
                      alt={`Diamond view ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setActiveImageIndex(prev => prev === 0 ? diamond.media.photo.length - 1 : prev - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => prev === diamond.media.photo.length - 1 ? 0 : prev + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center gap-2">
                {diamond.media.photo.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setShowVideo(false);
                      setActiveImageIndex(index);
                    }}
                    className={`relative h-12 w-12 rounded-lg overflow-hidden ${
                      !showVideo && activeImageIndex === index ? "ring-2 ring-theme-500" : ""
                    }`}
                  >
                    <img src={photo} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
                <button
                  onClick={() => setShowVideo(true)}
                  className={`relative h-12 w-12 rounded-lg overflow-hidden ${showVideo ? "ring-2 ring-theme-500" : ""}`}
                >
                  <img src={diamond.media.video} alt="Video thumbnail" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 max-w-md mx-auto">
                <button onClick={() => addtocart()} className="flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg hover:bg-gray-50 text-sm">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button onClick={() => addtowishlist()} className="flex-1 flex items-center justify-center gap-1 py-1.5 border rounded-lg hover:bg-gray-50 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>

            {/* Right Section - Details */}
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h1 className="text-xl font-semibold text-theme-800">
                  {diamond.shape} Diamond {diamond.carat} ct
                </h1>
                <div className="flex justify-between items-baseline">
                  <p className="text-theme-600">Stone No: {diamond.stoneno}</p>
                  <p className="text-xl font-semibold text-theme-700">
                    ${formatNumber(diamond.price)}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-theme-200 mb-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-1 text-sm font-medium border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-theme-600 text-theme-700'
                      : 'border-transparent text-theme-400 hover:text-theme-500'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('dimensions')}
                  className={`flex-1 py-1 text-sm font-medium border-b-2 ${
                    activeTab === 'dimensions'
                      ? 'border-theme-600 text-theme-700'
                      : 'border-transparent text-theme-400 hover:text-theme-500'
                  }`}
                >
                  Dimensions
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {activeTab === 'specs' ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="space-y-2">
                      <Detail label="Shape" value={diamond.shape} />
                      <Detail label="Carat" value={diamond.carat} />
                      <Detail label="Color" value={diamond.color} />
                      <Detail label="Clarity" value={diamond.clarity} />
                      <Detail label="Cut" value={diamond.cut} grade={true} />
                    </div>
                    <div className="space-y-2">
                      <Detail label="Polish" value={diamond.polish} grade={true} />
                      <Detail label="Symmetry" value={diamond.symmetry} grade={true} />
                      <Detail label="Fluorescence" value={diamond.fluorescence} />
                      <Detail label="Lab" value={diamond.lab} />
                      <Detail label="Certificate" value={diamond.certificateno} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="space-y-2">
                      <Detail label="Table" value={`${diamond.table}%`} />
                      <Detail label="Depth" value={`${diamond.depth}%`} />
                      <Detail label="Crown" value={`${diamond.crown}°`} />
                      <Detail label="Pavilion" value={`${diamond.pavilion}°`} />
                    </div>
                    <div className="space-y-2">
                      <Detail label="Length" value={`${diamond.length} mm`} />
                      <Detail label="Width" value={`${diamond.width} mm`} />
                      <Detail label="Height" value={`${diamond.height} mm`} />
                      <Detail label="Ratio" value={diamond.ratio} />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-2 mt-2">
                <button className="flex-1 py-1.5 bg-theme-600 text-white rounded-lg hover:bg-theme-700 text-sm font-medium">
                  Inquire Now
                </button>
                <button className="flex items-center justify-center w-8 aspect-square border rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}