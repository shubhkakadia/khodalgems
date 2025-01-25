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
  { label: "Round", icon: roundIcon },
  { label: "Cushion", icon: cushionIcon },
  { label: "Asscher", icon: asscherIcon },
  { label: "Emerald", icon: emeraldIcon },
  { label: "Heart", icon: heartIcon },
  { label: "Marquise", icon: marquiseIcon },
  { label: "Oval", icon: ovalIcon },
  { label: "Pear", icon: pearIcon },
  { label: "Princess", icon: princessIcon },
  { label: "Radiant", icon: radiantIcon },
];
const colorData = [
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
const cutData = ["EX", "VG", "GD", "FR", "PR"];
const polishData = ["EX", "VG", "GD", "FR", "PR"];
const symmetryData = ["EX", "VG", "GD", "FR", "PR"];
const fluorescenceData = ["None", "VSL", "SLT", "FNT", "MED", "STG", "VST"];
const labData = ["GIA", "IGI", "HRD"];
const HnAData = ["EX", "VG", "GD", "None"];
const eyeCleanData = ["Yes", "No"];
const locationData = ["India", "Hong Kong", "USA", "Thailand"];
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
  "Faint",
  "Very Light",
  "Light",
  "Fancy Light",
  "Fancy",
  "Fancy Dark",
  "Fancy Intense",
  "Fancy Vivid",
  "Fancy Deep",
];
const overtoneData = [
  "None",
  "Yellow",
  "Yellowish",
  "Pink",
  "Pinkish",
  "Blue",
  "Bluish",
  "Red",
  "Reddish",
  "Green",
  "Greenish",
  "Purple",
  "Purplish",
  "Orange",
  "Orangey",
  "Violet",
  "Gray",
  "Grayish",
  "Black",
  "Brown",
  "Brownish",
  "Champagne",
  "Cognac",
  "Chameleon",
  "Violetish",
  "White",
  "Brown-Greenish",
  "Gray-Greenish",
  "Gray-Yellowish",
  "Orange-Brown",
  "Other",
];
const fancyColorData = [
  "Yellow",
  "Pink",
  "Blue",
  "Red",
  "Green",
  "Purple",
  "Orange",
  "Violet",
  "Gray",
  "Black",
  "Brown",
  "Champagne",
  "Cognac",
  "Chameleon",
  "White",
  "Purple-Pink",
  "Purple-Pink",
  "Green-Grey",
  "Yellow-Brown",
  "Yellow-Grey",
  "Pink-Purple",
  "Orange-Brown",
];

export const CustomDropdown = ({
  label,
  options,
  value,
  setter,
  id,
  showColor,
  defaultValue = options[0],
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
    setterFn(option);
    setOpenDropdown("");
    setIsInputActive(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
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
                        backgroundColor: option.split(" ")[0].toLowerCase(),
                      }}
                    />
                  )}
                  <span
                    className={`block truncate ${
                      value === option
                        ? "font-medium text-theme-700"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </span>
                  {value === option && (
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

  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPolish, setSelectedPolish] = useState([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState([]);
  const [selectedFluorescence, setSelectedFluorescence] = useState([]);
  const [selectedLab, setSelectedLab] = useState([]);
  const [selectedHnA, setSelectedHnA] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedcaratwt, setSelectedcaratwt] = useState([]);
  const [selectedEyeClean, setSelectedEyeClean] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState([]);
  const [selectedOvertone, setSelectedOvertone] = useState([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState([]);
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [foundQuantity, setFoundQuantity] = useState(1200);

  // Function to update the range in the desired format
  const updatecaratwtRange = (from, to) => {
    setSelectedcaratwt(`${from}-${to}`);
  };

  // Function to build JSON object of selections
  const getSelectionsJson = () => {
    const selections = {
      Shapes: selectedShapes,
      Colors: selectedColors,
      Clarity: selectedClarity,
      Cut: selectedCut,
      Polish: selectedPolish,
      Symmetry: selectedSymmetry,
      Fluorescence: selectedFluorescence,
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
        setFoundQuantity(response.data.UserData.length);
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
    fetchStock()
  }, []);

  // Toggle selection with logging
  const toggleSelection = (selectionList, setSelectionList, value) => {
    // setSelectionList([...selectionList, value]);
    setSelectionList((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
    // getSelectionsJson(); // Log selections on every change
  };

  // Reset all selections
  const resetSelections = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setSelectedClarity([]);
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setSelectedFluorescence([]);
    setSelectedLab([]);
    setSelectedHnA([]);
    setSelectedLocation([]);
    setSelectedcaratwt([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    setSelectedFancyColor([]);
    setSelectedEyeClean("");
    dispatch(resetSelection());
    getSelectionsJson(); // Log selections after reset
  };

  useEffect(() => {
    setSelectedShapes(selections.Shapes);
    setSelectedColors(selections.Colors);
    setSelectedClarity(selections.Clarity);
    setSelectedCut(selections.Cut);
    setSelectedPolish(selections.Polish);
    setSelectedSymmetry(selections.Symmetry);
    setSelectedFluorescence(selections.Fluorescence);
    setSelectedLab(selections.Lab);
    setSelectedHnA(selections.HeartsAndArrows);
    setSelectedLocation(selections.Location);
    setSelectedcaratwt(selections.CaratWt);
    setSelectedEyeClean(selections.EyeClean);
    setSelectedIntensity(selections.Intensity);
    setSelectedOvertone(selections.Overtone);
    setSelectedFancyColor(selections.FancyColor);
  }, [selections]);

  const handleSearch = () => {
    getSelectionsJson(); // Log selections before navigating
    const newSelections = {
      Shapes: selectedShapes,
      Colors: selectedColors,
      Clarity: selectedClarity,
      Cut: selectedCut,
      Polish: selectedPolish,
      Symmetry: selectedSymmetry,
      Fluorescence: selectedFluorescence,
      Lab: selectedLab,
      HeartsAndArrows: selectedHnA,
      Location: selectedLocation,
      CaratWt: selectedcaratwt,
      EyeClean: selectedEyeClean,
      Intensity: selectedIntensity,
      Overtone: selectedOvertone,
      FancyColor: selectedFancyColor,
    };

    dispatch(setSelections(newSelections));
    navigate("/stones");
  };

  const handleNavigation = (path) => {
    navigate(path);
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
            onClick={() => handleNavigation("/contactus")}
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
                    toggleSelection(
                      selectedShapes,
                      setSelectedShapes,
                      shape.label
                    )
                  }
                  className={`cursor-pointer flex flex-col items-center w-[50px] md:w-[60px] group hover:text-theme-600 ${
                    selectedShapes.includes(shape.label)
                      ? "text-theme-800"
                      : "text-gray-700"
                  }`}
                >
                  <img
                    src={shape.icon}
                    alt={shape.label}
                    className={`w-10 h-10 transition-all ${
                      selectedShapes.includes(shape.label)
                        ? "[filter:brightness(0)_saturate(100%)_invert(11%)_sepia(88%)_saturate(3619%)_hue-rotate(240deg)_brightness(93%)_contrast(98%)]"
                        : "[filter:brightness(0)_saturate(100%)_invert(46%)_sepia(3%)_saturate(12%)_hue-rotate(314deg)_brightness(97%)_contrast(92%)]"
                    } group-hover:[filter:brightness(0)_saturate(100%)_invert(34%)_sepia(64%)_saturate(3519%)_hue-rotate(230deg)_brightness(89%)_contrast(92%)]`}
                  />
                  <span
                    className={`mt-1 ${
                      selectedShapes.includes(shape.label)
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
                  key={color}
                  onClick={() =>
                    toggleSelection(selectedColors, setSelectedColors, color)
                  }
                  className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                    selectedColors.includes(color)
                      ? "bg-theme-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {color}
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
          <div>
            <h3 className="text-lg font-semibold mb-2">Clarity</h3>
            <div className="flex flex-wrap gap-3">
              {clarityData.map((clarity) => (
                <div
                  key={clarity}
                  onClick={() =>
                    toggleSelection(
                      selectedClarity,
                      setSelectedClarity,
                      clarity
                    )
                  }
                  className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                    selectedClarity.includes(clarity)
                      ? "bg-theme-800 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {clarity}
                </div>
              ))}
            </div>
          </div>

          {/* Carat Weight Selection */}
          <div className="flex flex-wrap xl:gap-16 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Carat Weight</h3>
              <div className="flex flex-wrap gap-3">
                {caratwtData.map((caratwt) => (
                  <div
                    key={caratwt}
                    onClick={() =>
                      toggleSelection(
                        selectedcaratwt,
                        setSelectedcaratwt,
                        caratwt
                      )
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedcaratwt.includes(caratwt)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {caratwt}
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Range Input */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Custom Range</h4>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="number"
                    id="rangeFrom"
                    value={rangeFrom}
                    onChange={(e) => {
                      setRangeFrom(e.target.value);
                      updatecaratwtRange(e.target.value, rangeTo);
                    }}
                    placeholder="Min"
                    className="mt-1 p-2 w-32 border border-gray-300 rounded-lg shadow-sm focus:ring-theme-600 focus:border-theme-600"
                  />
                </div>
                <p>to</p>
                <div>
                  <input
                    type="number"
                    id="rangeTo"
                    value={rangeTo}
                    onChange={(e) => {
                      setRangeTo(e.target.value);
                      updatecaratwtRange(rangeFrom, e.target.value);
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
                    onClick={() =>
                      toggleSelection(selectedCut, setSelectedCut, cut)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedCut.includes(cut)
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
                    onClick={() =>
                      toggleSelection(selectedPolish, setSelectedPolish, polish)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedPolish.includes(polish)
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
                      toggleSelection(
                        selectedSymmetry,
                        setSelectedSymmetry,
                        symmetry
                      )
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedSymmetry.includes(symmetry)
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
                      toggleSelection(
                        selectedFluorescence,
                        setSelectedFluorescence,
                        fluoresence
                      )
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedFluorescence.includes(fluoresence)
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
                    onClick={() =>
                      toggleSelection(selectedHnA, setSelectedHnA, HnA)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedHnA.includes(HnA)
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
                    onClick={() =>
                      toggleSelection(selectedLab, setSelectedLab, lab)
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedLab.includes(lab)
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
                    key={location}
                    onClick={() =>
                      toggleSelection(
                        selectedLocation,
                        setSelectedLocation,
                        location
                      )
                    }
                    className={`cursor-pointer shadow-lg w-auto p-4 h-8 flex items-center justify-center rounded hover:bg-theme-600 hover:text-white ${
                      selectedLocation.includes(location)
                        ? "bg-theme-800 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {location}
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
