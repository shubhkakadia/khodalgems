import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import roundIcon from "../../assets/Shapes/Round.svg"; // Replace with actual path
import cushionIcon from "../../assets/Shapes/Cushion.svg";
import asscherIcon from "../../assets/Shapes/Asscher.svg";
import emeraldIcon from "../../assets/Shapes/Emerald.svg";
import heartIcon from "../../assets/Shapes/Heart.svg";
import marquiseIcon from "../../assets/Shapes/Marquise.svg";
import ovalIcon from "../../assets/Shapes/Oval.svg";
import pearIcon from "../../assets/Shapes/Pear.svg";
import princessIcon from "../../assets/Shapes/Princess.svg";
import radiantIcon from "../../assets/Shapes/Radiant.svg";
import { resetSelection, setSelections } from "../state/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { setLoading, setSuccess, setError } from "../state/stockAPI.js";
import axios from "axios";
import { toast } from "react-toastify";

const shapeData = [
  { label: "Round", icon: roundIcon, keyword: "ROUND" },
  { label: "Cushion", icon: cushionIcon, keyword: "CUSHM" },
  { label: "Asscher", icon: asscherIcon, keyword: "ASSCH" },
  { label: "Emerald", icon: emeraldIcon, keyword: "EMERALD" },
  { label: "Heart", icon: heartIcon, keyword: "HEART" },
  { label: "Marquise", icon: marquiseIcon, keyword: "MARQUISE" },
  { label: "Oval", icon: ovalIcon, keyword: "OVAL" },
  { label: "Pear", icon: pearIcon, keyword: "PEAR" },
  { label: "Princess", icon: princessIcon, keyword: "PRINCESS" },
  { label: "Radiant", icon: radiantIcon, keyword: "RADIANT" },
];
const colorData = [
  { label: "D", keyword: "D" },
  { label: "E", keyword: "E" },
  { label: "F", keyword: "F" },
  { label: "G", keyword: "G" },
  { label: "H", keyword: "H" },
  { label: "I", keyword: "I" },
  { label: "J", keyword: "J" },
  { label: "K", keyword: "K" },
  { label: "L", keyword: "L" },
  { label: "M", keyword: "M" },
  { label: "N", keyword: "N" },
  { label: "O", keyword: "O-P" },
  { label: "P", keyword: "O-P" },
  { label: "Q", keyword: "Q-R" },
  { label: "R", keyword: "Q-R" },
  { label: "S", keyword: "S-T" },
  { label: "T", keyword: "S-T" },
  { label: "U", keyword: "U-V" },
  { label: "V", keyword: "U-V" },
  { label: "W", keyword: "W-X" },
  { label: "X", keyword: "W-X" },
  { label: "Y", keyword: "Y-Z" },
  { label: "Z", keyword: "Y-Z" },
];
const clarityData = [
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
const cutData = ["EX", "VG", "GD", "FR", "PR", "ID"];
const polishData = ["EX", "VG", "GD", "FR", "PR", "ID"];
const symmetryData = ["EX", "VG", "GD", "FR", "PR", "ID"];
const fluorescenceData = ["NON", "VSL", "SL", "FNT", "MED", "STG", "VST"];
const labData = ["GIA", "IGI", "HRD"];
const HnAData = ["EX", "VG", "GD", "NON"];
const eyeCleanData = ["YES", "NO"];
const locationData = [
  { label: "Hong Kong", keyword: "HONG KONG" },
  { label: "Mumbai", keyword: "MUMBAI" },
  { label: "Surat", keyword: "SURAT" },
];
const caratwtData = [
  "20s",
  "30s",
  "40s",
  "50s",
  "60s",
  "70s",
  "80s",
  "90s",
  "1Ct",
  "2Ct",
  "3Ct+",
];
const intensityData = [
  { label: "Faint", keyword: "F" },
  { label: "Very Light", keyword: "VL" },
  { label: "Light", keyword: "L" },
  { label: "Fancy Light", keyword: "FCL" },
  { label: "Fancy", keyword: "FC" },
  { label: "Fancy Dark", keyword: "FD" },
  { label: "Fancy Intense", keyword: "FI" },
  { label: "Fancy Vivid", keyword: "FV" },
  { label: "Fancy Deep", keyword: "FND" },
];
const overtoneData = [
  { label: "None", keyword: "NON" },
  { label: "Yellow", keyword: "YELLOW" },
  { label: "Yellowish", keyword: "YELLOWISH" },
  { label: "Pink", keyword: "PINK" },
  { label: "Pinkish", keyword: "PINKISH" },
  { label: "Blue", keyword: "BLUE" },
  { label: "Bluish", keyword: "BLUISH" },
  { label: "Red", keyword: "RED" },
  { label: "Reddish", keyword: "REDDISH" },
  { label: "Green", keyword: "GREEN" },
  { label: "Greenish", keyword: "GREENISH" },
  { label: "Purple", keyword: "PURPLE" },
  { label: "Purplish", keyword: "PURPLISH" },
  { label: "Orange", keyword: "ORANGE" },
  { label: "Orangey", keyword: "ORANGEY" },
  { label: "Violet", keyword: "VIOLET" },
  { label: "Gray", keyword: "GRAY" },
  { label: "Grayish", keyword: "GRAYISH" },
  { label: "Black", keyword: "BLACK" },
  { label: "Brown", keyword: "BROWN" },
  { label: "Brownish", keyword: "BROWNISH" },
  { label: "Champagne", keyword: "CHAMPAGNE" },
  { label: "Cognac", keyword: "COGNAC" },
  { label: "Chameleon", keyword: "CHAMELEON" },
  { label: "Violetish", keyword: "VIOLETISH" },
  { label: "White", keyword: "WHITE" },
  { label: "Brown-Greenish", keyword: "BROWN-GREENISH" },
  { label: "Gray-Greenish", keyword: "GRAY-GREENISH" },
  { label: "Gray-Yellowish", keyword: "GRAY-YELLOWISH" },
  { label: "Orange-Brown", keyword: "ORANGE-BROWN" },
  { label: "Other", keyword: "OTHER" },
];
const fancyColorData = [
  { label: "Yellow", keyword: "YELLOW" },
  { label: "Pink", keyword: "PNK" },
  { label: "Blue", keyword: "BLU" },
  { label: "Red", keyword: "RED" },
  { label: "Green", keyword: "GREEN" },
  { label: "Purple", keyword: "PURPLE" },
  { label: "Orange", keyword: "ORANGE" },
  { label: "Violet", keyword: "VIOLET" },
  { label: "Gray", keyword: "GRAY" },
  { label: "Black", keyword: "BLACK" },
  { label: "Brown", keyword: "BROWN" },
  { label: "Champagne", keyword: "CHAMPAGNE" },
  { label: "Cognac", keyword: "COGNAC" },
  { label: "Chameleon", keyword: "CHAMELEON" },
  { label: "White", keyword: "WHITE" },
  { label: "Purple-Pink", keyword: "PURPLE-PINK" },
  { label: "Green-Grey", keyword: "GREEN-GREY" },
  { label: "Yellow-Brown", keyword: "YELLOW-BROWN" },
  { label: "Yellow-Grey", keyword: "YELLOW-GREY" },
  { label: "Pink-Purple", keyword: "PINK-PURPLE" },
  { label: "Orange-Brown", keyword: "ORANGE-BROWN" },
];

export const CustomDropdown = ({
  label,
  options,
  value,
  setter,
  id,
  showColor,
  defaultValue = options[0].label,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown("");
        setIsInputActive(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = () => {
    setIsInputActive(true);
    setOpenDropdown(id);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSelect = (option, setterFn) => {
    setterFn(option.keyword);
    setOpenDropdown("");
    setIsInputActive(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayValue = value || defaultValue;

  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <label className="text-lg font-semibold mb-2 text-gray-900 w-full">
        {label}
      </label>

      {!isInputActive ? (
        <button
          onClick={handleDropdownClick}
          className="shadow-lg flex items-center justify-between w-[250px] px-4 py-2 text-left bg-white border border-gray-300 rounded-md hover:border-theme-400 focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-theme-500"
        >
          <span
            className={`block truncate ${
              !value ? "text-gray-500 dark:text-gray-400" : "text-gray-700"
            }`}
          >
            {displayValue ? displayValue : `Search ${label}...`}
          </span>
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${label}...`}
          className="w-[250px] px-4 py-2 border border-theme-500 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-theme-500"
        />
      )}

      {openDropdown === id && (
        <div className="absolute z-10 w-[250px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg top-[calc(100%_+_4px)]">
          <ul className="py-1 max-h-[200px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option, setter)}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-theme-100 transition-colors duration-150"
                >
                  {showColor && (
                    <span
                      className="w-4 h-4 rounded-full mr-2 border border-gray-200 dark:border-gray-700"
                      style={{
                        backgroundColor: option.label
                          .split(" ")[0]
                          .toLowerCase(),
                      }}
                    />
                  )}
                  <span
                    className={`block truncate ${
                      value === option.label
                        ? "font-medium text-theme-700"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </span>
                  {value === option.label && (
                    <span className="ml-auto">
                      <svg
                        className="h-4 w-4 text-theme-700"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No matches found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function Search() {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.search);
  const navigate = useNavigate();

  const [selectedShapes, setSelectedShapes] = useState(selections.Shape);
  const [selectedColors, setSelectedColors] = useState(selections.Color);
  const [selectedClarity, setSelectedClarity] = useState(selections.Clarity);
  const [selectedCut, setSelectedCut] = useState(selections.Cut);
  const [selectedPolish, setSelectedPolish] = useState(selections.Polish);
  const [selectedSymmetry, setSelectedSymmetry] = useState(selections.Symmetry);
  const [selectedFluorescence, setSelectedFluorescence] = useState(
    selections.Flr
  );
  const [selectedLab, setSelectedLab] = useState(selections.Lab);
  const [selectedHnA, setSelectedHnA] = useState(selections.HandA);
  const [selectedLocation, setSelectedLocation] = useState(selections.Location);
  const [selectedcaratwt, setSelectedcaratwt] = useState(
    selections.FromToCtsSize
  );
  const [selectedEyeClean, setSelectedEyeClean] = useState(selections.EyeClean);
  const [selectedIntensity, setSelectedIntensity] = useState(
    selections.Intensity
  );
  const [selectedOvertone, setSelectedOvertone] = useState(selections.Overtone);
  const [selectedFancyColor, setSelectedFancyColor] = useState(
    selections.FancyColor
  );
  const [FromCts, setFromCts] = useState(selections.FromCts);
  const [ToCts, setToCts] = useState(selections.ToCts);
  const [foundQuantity, setFoundQuantity] = useState();

  // Function to build JSON object of selections
  const getSelectionsJson = () => {
    const selections = {
      Shape: selectedShapes,
      Colors: selectedColors,
      Clarity: selectedClarity,
      FromCts: FromCts,
      ToCts: ToCts,
      Cut: selectedCut,
      Polish: selectedPolish,
      Symmetry: selectedSymmetry,
      Flr: selectedFluorescence,
      Lab: selectedLab,
      HeartsAndArrows: selectedHnA,
      Location: selectedLocation,
      CaratWt: selectedcaratwt,
      EyeClean: selectedEyeClean,
      Intensity: selectedIntensity,
      Overtone: selectedOvertone,
      FancyColor: selectedFancyColor,
    };
    return selections;
  };

  useEffect(() => {
    getSelectionsJson(); // Log selections on every change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedShapes,
    selectedColors,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence,
    selectedLab,
    selectedHnA,
    selectedLocation,
    selectedcaratwt,
    selectedEyeClean,
    selectedIntensity,
    selectedOvertone,
    selectedFancyColor,
  ]);

  const fetchStock = async () => {
    try {
      // Set loading state when the API call starts
      dispatch(setLoading(true));

      // Prepare the request data
      const defaultParams = {
        Shape: selectedShapes,
        Color: selectedColors,
        Intensity: selectedIntensity,
        Overtone: selectedOvertone,
        FancyColor: selectedFancyColor,
        Clarity: selectedClarity,
        FromToCtsSize: "",
        FromCts: FromCts,
        ToCts: ToCts,
        Cut: selectedCut,
        Polish: selectedPolish,
        Symmetry: selectedSymmetry,
        Flr: selectedFluorescence,
        HandA: selectedHnA,
        EyeClean: selectedEyeClean,
        Lab: selectedLab,
        Location: selectedLocation,
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
        dispatch(setSuccess(response.data.UserData || ""));
        setFoundQuantity(response.data.UserData.length);
        dispatch(setError(null));
      } else {
        dispatch(
          setError(response.data.message || "Unexpected response format")
        );
        dispatch(setSuccess(""));
      }
    } catch (error) {
      // Comprehensive error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      dispatch(setError(errorMessage));
      dispatch(setSuccess(""));

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
  }, [
    selections,
    selectedShapes,
    selectedColors,
    selectedClarity,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence,
    selectedLab,
    selectedHnA,
    selectedLocation,
    selectedcaratwt,
    selectedEyeClean,
    selectedIntensity,
    selectedOvertone,
    selectedFancyColor,
    FromCts,
    ToCts,
  ]);

  // Toggle selection with logging
  const toggleSelection = (setSelectionList, value) => {
    setSelectionList((prev) => {
      // Ensure `prev` is a string and split it into an array
      const currentArray = prev?.length ? prev.split(", ").filter(Boolean) : "";

      // Toggle the value in the array
      const updatedArray = currentArray?.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      // Convert the updated array back to a string
      return updatedArray.join(", ");
    });
  };

  // Reset all selections
  const resetSelections = () => {
    setSelectedShapes("");
    setSelectedColors("");
    setSelectedClarity("");
    setSelectedCut("");
    setSelectedPolish("");
    setSelectedSymmetry("");
    setSelectedFluorescence("");
    setSelectedLab("");
    setSelectedHnA("");
    setSelectedLocation("");
    setSelectedcaratwt("");
    setSelectedIntensity("");
    setSelectedOvertone("");
    setSelectedFancyColor("");
    setSelectedEyeClean("");
    setFromCts(0);
    setToCts(0);
    dispatch(resetSelection());
    getSelectionsJson(); // Log selections after reset
  };

  useEffect(() => {
    setSelectedShapes(selections.Shape);
    setSelectedColors(selections.Color);
    setSelectedClarity(selections.Clarity);
    setSelectedCut(selections.Cut);
    setSelectedPolish(selections.Polish);
    setSelectedSymmetry(selections.Symmetry);
    setSelectedFluorescence(selections.Flr);
    setSelectedLab(selections.Lab);
    setSelectedHnA(selections.HandA);
    setSelectedLocation(selections.Location);
    setSelectedcaratwt(selections.FromToCtsSize);
    setSelectedEyeClean(selections.EyeClean);
    setSelectedIntensity(selections.Intensity);
    setSelectedOvertone(selections.Overtone);
    setSelectedFancyColor(selections.FancyColor);
  }, [selections]);

  const handleSearch = () => {
    getSelectionsJson(); // Log selections before navigating
    const newSelections = {
      Shape: selectedShapes,
      Color: selectedColors,
      Clarity: selectedClarity,
      Cut: selectedCut,
      Polish: selectedPolish,
      Symmetry: selectedSymmetry,
      Flr: selectedFluorescence,
      Lab: selectedLab,
      HandA: selectedHnA,
      Location: selectedLocation,
      CaratWt: selectedcaratwt,
      EyeClean: selectedEyeClean,
      Intensity: selectedIntensity,
      Overtone: selectedOvertone,
      FancyColor: selectedFancyColor,
      FromCts: FromCts,
      ToCts: ToCts,
    };

    dispatch(setSelections(newSelections));
    navigate("/stones");
  };

  return (
    <div className="flex w-full bg-main-bg">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-auto w-[85%]">
        <div className="p-4 sticky top-0 bg-main-bg z-[5] flex md:justify-between md:items-center md:flex-row flex-col">
          <h2 className="text-4xl font-semibold text-theme-600">
            Search Inventory
          </h2>
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

        <div className="flex flex-col mx-4 mb-4 gap-4">
          {/* Shape Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shape</h3>
            <div className="flex flex-wrap gap-6">
              {shapeData.map((shape) => (
                <div
                  key={shape.label}
                  onClick={() =>
                    toggleSelection(setSelectedShapes, shape.keyword)
                  }
                  className={`cursor-pointer flex flex-col items-center w-[50px] md:w-[60px] group hover:text-theme-600 ${
                    selectedShapes?.includes(shape.keyword)
                      ? "text-theme-800"
                      : "text-gray-700"
                  }`}
                >
                  <img
                    src={shape.icon}
                    alt={shape.label}
                    className={`w-10 h-10 transition-all ${
                      selectedShapes?.includes(shape.keyword)
                        ? "[filter:brightness(0)_saturate(100%)_invert(11%)_sepia(88%)_saturate(3619%)_hue-rotate(240deg)_brightness(93%)_contrast(98%)]"
                        : "[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(3%)_saturate(12%)_hue-rotate(314deg)_brightness(97%)_contrast(92%)]"
                    } group-hover:[filter:brightness(0)_saturate(100%)_invert(34%)_sepia(64%)_saturate(3519%)_hue-rotate(230deg)_brightness(89%)_contrast(92%)]`}
                  />
                  <span
                    className={`mt-1 ${
                      selectedShapes?.includes(shape.keyword)
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {shape.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex flex-wrap gap-3">
              {colorData.map((color) => (
                <div
                  key={color.label}
                  onClick={() =>
                    toggleSelection(setSelectedColors, color.keyword)
                  }
                  className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                    selectedColors?.includes(color.keyword)
                      ? "bg-theme-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {color.label}
                </div>
              ))}
            </div>
          </div>

          {/* Fancy Color Section */}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            <CustomDropdown
              label="Intensity"
              options={intensityData}
              value={selectedIntensity}
              setter={setSelectedIntensity}
              id="intensity"
              showColor={false}
              defaultValue="Select Intensity"
            />
            <CustomDropdown
              label="Overtone"
              options={overtoneData}
              value={selectedOvertone}
              setter={setSelectedOvertone}
              id="overtone"
              showColor={false}
              defaultValue="Select Overtone"
            />
            <CustomDropdown
              label="Color"
              options={fancyColorData}
              value={selectedFancyColor}
              setter={setSelectedFancyColor}
              id="color"
              showColor={true}
              defaultValue="Select Color"
            />
          </div>

          {/* Clarity Selection */}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            <div>
              {" "}
              <h3 className="text-lg font-semibold mb-2">Clarity</h3>
              <div className="flex flex-wrap gap-3">
                {clarityData.map((clarity) => (
                  <div
                    key={clarity}
                    onClick={() => toggleSelection(setSelectedClarity, clarity)}
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      (Array.isArray(selectedClarity)
                        ? selectedClarity
                        : selectedClarity
                            ?.split(",")
                            .map((item) => item.trim()) || []
                      ).some((item) => item === clarity)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {clarity}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Range Input */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Carat Weight Range</h4>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="number"
                    id="FromCts"
                    value={FromCts}
                    onChange={(e) => {
                      setFromCts(e.target.value);
                      // updatecaratwtRange(e.target.value, rangeTo);
                    }}
                    placeholder="Min"
                    className="mt-1 p-2 w-32 border border-gray-300 rounded-lg shadow-sm focus:ring-theme-600 focus:border-theme-600"
                  />
                </div>
                <p>to</p>
                <div>
                  <input
                    type="number"
                    id="ToCts"
                    value={ToCts}
                    onChange={(e) => {
                      setToCts(e.target.value);
                      // updatecaratwtRange(rangeFrom, e.target.value);
                    }}
                    placeholder="Max"
                    className="mt-1 p-2 w-32 border border-gray-300 rounded-lg shadow-sm focus:ring-theme-600 focus:border-theme-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cut, Polish, Symmetry */}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            {/* Cut */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Cut</h3>
              <div className="flex flex-wrap gap-3">
                {cutData.map((cut) => (
                  <div
                    key={cut}
                    onClick={() => toggleSelection(setSelectedCut, cut)}
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedCut?.includes(cut)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cut}
                  </div>
                ))}
              </div>
            </div>
            {/* Polish */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Polish</h3>
              <div className="flex flex-wrap gap-3">
                {polishData.map((polish) => (
                  <div
                    key={polish}
                    onClick={() => toggleSelection(setSelectedPolish, polish)}
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedPolish?.includes(polish)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {polish}
                  </div>
                ))}
              </div>
            </div>

            {/* Symmetry */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Symmetry</h3>
              <div className="flex flex-wrap gap-3">
                {symmetryData.map((symmetry) => (
                  <div
                    key={symmetry}
                    onClick={() =>
                      toggleSelection(setSelectedSymmetry, symmetry)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedSymmetry?.includes(symmetry)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {symmetry}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fluorescence and Hearts & Arrows and Eye Clean*/}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            {/* Fluoresence Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Fluoresence</h3>
              <div className="flex flex-wrap gap-3">
                {fluorescenceData.map((fluoresence) => (
                  <div
                    key={fluoresence}
                    onClick={() =>
                      toggleSelection(setSelectedFluorescence, fluoresence)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      (Array.isArray(selectedFluorescence)
                        ? selectedFluorescence
                        : selectedFluorescence
                            ?.split(",")
                            .map((item) => item.trim()) || []
                      ).some((item) => item === fluoresence)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {fluoresence}
                  </div>
                ))}
              </div>
            </div>

            {/* Hearts & Arrows Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Hearts & Arrows</h3>
              <div className="flex flex-wrap gap-3">
                {HnAData.map((HnA) => (
                  <div
                    key={HnA}
                    onClick={() => toggleSelection(setSelectedHnA, HnA)}
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedHnA?.includes(HnA)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {HnA}
                  </div>
                ))}
              </div>
            </div>

            {/* Eye Clean */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Eye Clean</h3>
              <div className="flex flex-wrap gap-3">
                {eyeCleanData.map((eye) => (
                  <div
                    key={eye}
                    onClick={() =>
                      setSelectedEyeClean((prev) => (prev === eye ? "" : eye))
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedEyeClean === eye
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {eye}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lab and Location */}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            {/* Lab Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Lab</h3>
              <div className="flex flex-wrap gap-3">
                {labData.map((lab) => (
                  <div
                    key={lab}
                    onClick={() => toggleSelection(setSelectedLab, lab)}
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedLab?.includes(lab)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {lab}
                  </div>
                ))}
              </div>
            </div>

            {/* Location Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <div className="flex flex-wrap gap-3">
                {locationData.map((location) => (
                  <div
                    key={location.label}
                    onClick={() =>
                      toggleSelection(setSelectedLocation, location.keyword)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedLocation?.includes(location.keyword)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {location.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="md:flex space-x-3 justify-center sticky bottom-0 bg-main-bg py-4">
          <div className="flex gap-3 justify-center">
            {/* Search Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                className="bg-theme-600 text-white px-4 py-2 rounded-lg hover:bg-theme-700"
              >
                Search
              </button>
            </div>
            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={resetSelections}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-red-100"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center mt-2">
            <p className="font-semibold text-theme-600">
              Total stones found:{" "}
              {foundQuantity > 1000 ? "1000+" : foundQuantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
