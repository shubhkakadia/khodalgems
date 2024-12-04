import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Sidebar from "./Sidebar";
import stoneData from "../Data/diamond.json";
import fav from "../../assets/Sidebar icons/Fav.svg";
import cart from "../../assets/Sidebar icons/Cart.svg";
import favselected from "../../assets/Sidebar icons/fav-selected.svg";
import cartselected from "../../assets/Sidebar icons/cart-selected.svg";
import diamond from "../../assets/round.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Stones() {
  const { stones } = stoneData; // Destructure stones array from JSON
  const [selected, setSelected] = useState([]);
  const [favToggled, setFavToggled] = useState({});
  const [cartToggled, setCartToggled] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: "asc",
  });

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
    "Z",
  ];
  const cutOrder = ["EX", "VG", "GD", "FR", "PR"];
  const fluorescenceOrder = ["None", "FNT", "MED", "STG", "VST"];
  const gurdleOrder = ["Thin", "Medium", "Slightly Thick", "Thick"];
  const culetOrder = ["None", "Very Small", "Small"];
  const eyeCleanOrder = ["Yes", "No"];

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = stones.slice(indexOfFirstRow, indexOfLastRow);

  // Handle checkbox change
  const handleSelection = (stone) => {
    setSelected((prev) => {
      if (prev.find((item) => item.stoneno === stone.stoneno)) {
        return prev.filter((item) => item.stoneno !== stone.stoneno); // Remove if already selected
      }
      return [...prev, stone]; // Add if not selected
    });
  };

  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //Add to cart
  const addtocart = () => {
    // call api to add selected stones list to cart
    console.log(selected, "added to cart");
  };

  //Add to wishlist
  const addtowishlist = () => {
    // call api to add selected stones list to wishlist
    console.log(selected, "added to wislist");
  };

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

  // Toggle favorite button
  const toggleFav = (stoneNo) => {
    // call api to add selected stone to wishlist
    setFavToggled((prev) => ({
      ...prev,
      [stoneNo]: !prev[stoneNo],
    }));
  };

  // Toggle cart button
  const toggleCart = (stoneNo) => {
    // call api to add selected stone to cart
    setCartToggled((prev) => ({
      ...prev,
      [stoneNo]: !prev[stoneNo],
    }));
  };

  // Calculations
  const totalPieces = selected.length;
  const totalCarat = selected
    .reduce((sum, stone) => sum + parseFloat(stone.carat || 0), 0)
    .toFixed(2);
  const totalPrice = selected
    .reduce((sum, stone) => sum + parseFloat(stone.price || 0), 0)
    .toFixed(2);
  const totalRap = selected
    .reduce((sum, stone) => sum + parseFloat(stone.rap || 0), 0)
    .toFixed(2);

  // Calculate total discount amount
  const totalDiscountAmount = selected
    .reduce((sum, stone) => {
      const price = parseFloat(stone.price || 0);
      const discount = parseFloat(stone.disc || 0);
      return sum + (price * discount) / 100;
    }, 0)
    .toFixed(2);

  // Calculate total discount percentage
  const totalDiscount =
    totalPrice > 0
      ? ((totalDiscountAmount / totalPrice) * 100).toFixed(2)
      : "0.00";

  const customSort = (data, column, direction) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      // Handle specific column sorting
      if (column === "clarity") {
        aValue = clarityOrder.indexOf(aValue);
        bValue = clarityOrder.indexOf(bValue);
      } else if (column === "color") {
        aValue = colorOrder.indexOf(aValue);
        bValue = colorOrder.indexOf(bValue);
      } else if (column === "price" || column === "carat" || column === "rap") {
        aValue = parseFloat(aValue || 0);
        bValue = parseFloat(bValue || 0);
      } else if (["cut", "polish", "symmetry"].includes(column)) {
        aValue = cutOrder.indexOf(aValue);
        bValue = cutOrder.indexOf(bValue);
      } else if (column === "fluorescence") {
        aValue = fluorescenceOrder.indexOf(aValue);
        bValue = fluorescenceOrder.indexOf(bValue);
      } else if (column === "gurdle") {
        aValue = gurdleOrder.indexOf(aValue);
        bValue = gurdleOrder.indexOf(bValue);
      } else if (column === "culet") {
        aValue = culetOrder.indexOf(aValue);
        bValue = culetOrder.indexOf(bValue);
      } else if (column === "eye") {
        aValue = eyeCleanOrder.indexOf(aValue);
        bValue = eyeCleanOrder.indexOf(bValue);
      } else if (
        [
          "price",
          "carat",
          "rap",
          "disc",
          "table",
          "depth",
          "crown",
          "pavilion",
          "length",
          "width",
          "height",
          "ratio",
          "pricepercarat",
        ].includes(column)
      ) {
        // Numeric sorting
        aValue = parseFloat(aValue || 0);
        bValue = parseFloat(bValue || 0);
      } else if (["stoneno"].includes(column)) {
        // Numeric sorting for IDs
        aValue = parseInt(aValue || 0, 10);
        bValue = parseInt(bValue || 0, 10);
      } else if (["shape", "lab", "location"].includes(column)) {
        // Alphabetical sorting
        aValue = aValue || "";
        bValue = bValue || "";
      } else {
        return 0; // No sorting for "Comment"
      }

      // Compare values based on direction
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  const handleSort = (column) => {
    setSortConfig((prev) => {
      const direction =
        prev.column === column && prev.direction === "asc" ? "desc" : "asc";
      return { column, direction };
    });
  };

  const sortedData = sortConfig.column
    ? customSort(currentRows, sortConfig.column, sortConfig.direction)
    : currentRows;

  // Function to toggle select all
  const toggleSelectAll = () => {
    const areAllSelected = currentRows.every((stone) =>
      selected.some((item) => item.stoneno === stone.stoneno)
    );

    if (areAllSelected) {
      // Deselect all items on the current page
      setSelected((prev) =>
        prev.filter(
          (item) => !currentRows.some((stone) => stone.stoneno === item.stoneno)
        )
      );
    } else {
      // Select all items on the current page
      const newSelected = [
        ...selected,
        ...currentRows.filter(
          (stone) => !selected.some((item) => item.stoneno === stone.stoneno)
        ),
      ];
      setSelected(newSelected);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto mt-4 ml-4 space-y-3 w-[85%] h-full">
        <div className="sticky top-0 bg-main-bg z-[5]">
          <h2 className="text-4xl font-semibold pb-2 mt-4 text-theme-600">
            Stones
          </h2>
          <Link
            to={"/search"}
            className="text-md font-semibold pb-4 text-theme-600 underline "
          >
            modify search
          </Link>
        </div>

        {/* Table */}
        {sortedData.length > 0 ? (
          <div className="overflow-x-auto overflow-y-auto h-[460px] transition-all duration-300 ease-in-out">
            <table className="table-auto border-collapse border border-gray-300 w-full sortable">
              <thead>
                <tr className="bg-gray-100 sticky top-0 border border-gray-300 cursor-pointer">
                  <th className="border border-gray-300 px-2 py-2 min-w-[100px] flex justify-around items-center">
                    Select{" "}
                    <input
                      type="checkbox"
                      checked={currentRows.every((stone) =>
                        selected.some((item) => item.stoneno === stone.stoneno)
                      )}
                      onChange={toggleSelectAll}
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="border border-gray-300 px-2 py-2">Actions</th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("stoneno")}
                  >
                    Stone No{" "}
                    {sortConfig.column === "stoneno" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="border border-gray-300 px-2 py-2 min-w-[125px]">
                    Certificate No
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("shape")}
                  >
                    Shape{" "}
                    {sortConfig.column === "shape" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("carat")}
                  >
                    Carat{" "}
                    {sortConfig.column === "carat" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("color")}
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                  >
                    Color{" "}
                    {sortConfig.column === "color" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    onClick={() => handleSort("clarity")}
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                  >
                    Clarity{" "}
                    {sortConfig.column === "clarity" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("price")}
                  >
                    Price{" "}
                    {sortConfig.column === "price" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("rap")}
                  >
                    Rap{" "}
                    {sortConfig.column === "rap" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("disc")}
                  >
                    Discount{" "}
                    {sortConfig.column === "disc" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("pricepercarat")}
                  >
                    $/carat{" "}
                    {sortConfig.column === "pricepercarat" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("cut")}
                  >
                    Cut{" "}
                    {sortConfig.column === "cut" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("polish")}
                  >
                    Polish{" "}
                    {sortConfig.column === "polish" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[125px]"
                    onClick={() => handleSort("symmetry")}
                  >
                    Symmetry{" "}
                    {sortConfig.column === "symmetry" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[130px]"
                    onClick={() => handleSort("fluorescence")}
                  >
                    Fluorescence{" "}
                    {sortConfig.column === "fluorescence" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[75px]"
                    onClick={() => handleSort("lab")}
                  >
                    Lab{" "}
                    {sortConfig.column === "lab" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="border border-gray-300 px-2 py-2">Comment</th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[150px]"
                    onClick={() => handleSort("eye")}
                  >
                    Eye clean{" "}
                    {sortConfig.column === "eye" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("table")}
                  >
                    Table%{" "}
                    {sortConfig.column === "table" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                    onClick={() => handleSort("depth")}
                  >
                    Depth%{" "}
                    {sortConfig.column === "depth" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                    onClick={() => handleSort("crown")}
                  >
                    Crown%{" "}
                    {sortConfig.column === "crown" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[120px]"
                    onClick={() => handleSort("pavilion")}
                  >
                    Pavilion%{" "}
                    {sortConfig.column === "pavilion" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                    onClick={() => handleSort("length")}
                  >
                    Length{" "}
                    {sortConfig.column === "length" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                    onClick={() => handleSort("width")}
                  >
                    Width{" "}
                    {sortConfig.column === "width" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[100px]"
                    onClick={() => handleSort("height")}
                  >
                    Height{" "}
                    {sortConfig.column === "height" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("gurdle")}
                  >
                    Gurdle{" "}
                    {sortConfig.column === "gurdle" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("culet")}
                  >
                    Culet{" "}
                    {sortConfig.column === "culet" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer  min-w-[75px]"
                    onClick={() => handleSort("ratio")}
                  >
                    Ratio{" "}
                    {sortConfig.column === "ratio" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="border border-gray-300 px-2 cursor-pointer min-w-[100px]"
                    onClick={() => handleSort("location")}
                  >
                    Location{" "}
                    {sortConfig.column === "location" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedData.map((stone, index) => {
                  const isSelected = selected.some(
                    (item) => item.stoneno === stone.stoneno
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
                      // onClick={() => handleSelection(stone)}
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
                            className="text-theme-600"
                            onClick={() => toggleFav(stone.stoneno)}
                          >
                            <img
                              src={
                                favToggled[stone.stoneno] ? favselected : fav
                              }
                              alt="wishlist"
                              className="h-4"
                            />
                          </button>
                          {/* Cart Button */}
                          <button
                            className="text-theme-600"
                            onClick={() => toggleCart(stone.stoneno)}
                          >
                            <img
                              src={
                                cartToggled[stone.stoneno] ? cartselected : cart
                              }
                              alt="cart"
                              className="h-4"
                            />
                          </button>
                        </div>
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right underline">
                        <Link
                          to={`/stonedetails/${stone.stoneno}`}
                          className="text-theme-600 hover:underline"
                        >
                          {stone.stoneno}
                        </Link>
                      </td>
                      {/* https://www.gia.edu/report-check?reportno=2477875998 */}
                      <td className="text-sm border border-gray-300 px-2 text-right underline">
                        <Link
                          to={`https://www.gia.edu/report-check?reportno=${stone.certificateno}`}
                          className="text-theme-600 hover:underline"
                        >
                          {stone.certificateno}
                        </Link>
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.shape}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right">
                        {stone.carat}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.color}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.clarity}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right">
                        ${formatNumber(stone.price)}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right">
                        {formatNumber(stone.rap)}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right">
                        {stone.disc}%
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-right">
                        {formatNumber(stone.pricepercarat || 0)}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.cut}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.polish}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.symmetry}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.fluorescence}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.lab}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.comment}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.eye}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.table}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.depth}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.crown}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.pavilion}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.length}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.width}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.height}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.gurdle}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.culet}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.ratio}
                      </td>
                      <td className="text-sm border border-gray-300 px-2 text-center">
                        {stone.location}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-[80vh] flex justify-center items-center">
              <div className="flex gap-4 items-center">
                <img src={diamond} alt="Diamond" />
                <div>
                  <h1 className="font-quicksand text-center text-gray-600 font-semibold">
                    Sorry!
                  </h1>
                  <span className="font-quicksand text-center text-gray-400 font-semibold">
                    can't find the requested search results
                  </span>
                </div>

                <img src={diamond} alt="Diamond" />
              </div>
            </div>
          </div>
        )}

        {sortedData.length > 0 && (
          <div>
            {/* Pagination */}
            <div className="flex flex-col sticky bottom-0 bg-main-bg border-t border-gray-100 p-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Rows per page dropdown - Responsive */}
                <div className="flex items-center">
                  <label
                    htmlFor="rowsPerPage"
                    className="text-sm font-medium text-gray-600"
                  >
                    Show
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="mx-2 h-9 w-16 rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-theme-500 focus:ring-theme-500"
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-600">entries</span>
                </div>

                {/* Pagination Navigation - Responsive */}
                <div className="flex items-center gap-1.5 order-3 sm:order-2 w-full sm:w-auto justify-center">
                  {/* Previous Button */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={`h-9 px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
          ${
            currentPage === 1
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200"
          }`}
                  >
                    <ChevronLeft className="h-5 w-5 block sm:hidden" />
                    <span className="hidden sm:block">Previous</span>
                  </button>

                  {/* Page Numbers - Adaptive Display */}
                  <div className="flex items-center gap-1.5">
                    {Array.from(
                      { length: Math.ceil(stones.length / rowsPerPage) },
                      (_, i) => i + 1
                    )
                      .filter((page) => {
                        // Show more numbers on desktop, fewer on mobile
                        const totalPages = Math.ceil(
                          stones.length / rowsPerPage
                        );
                        const isMobile = window.innerWidth < 640; // sm breakpoint

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
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="px-0.5 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                  ${
                    currentPage === page
                      ? "bg-theme-600 text-white"
                      : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200"
                  }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))}
                  </div>

                  {/* Next Button */}
                  <button
                    disabled={
                      currentPage === Math.ceil(stones.length / rowsPerPage)
                    }
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.ceil(stones.length / rowsPerPage)
                        )
                      )
                    }
                    className={`h-9 px-3 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
          ${
            currentPage === Math.ceil(stones.length / rowsPerPage)
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "bg-white text-theme-600 hover:bg-theme-50 border border-gray-200"
          }`}
                  >
                    <ChevronRight className="h-5 w-5 block sm:hidden" />
                    <span className="hidden sm:block">Next</span>
                  </button>
                </div>

                {/* Results Counter - Responsive */}
                <p className="text-sm text-gray-600 order-2 sm:order-3">
                  <span className="font-medium">
                    {Math.min(indexOfFirstRow + 1, stones.length)}-
                    {Math.min(indexOfLastRow, stones.length)}
                  </span>{" "}
                  of <span className="font-medium">{stones.length}</span>
                </p>
              </div>
            </div>

            {/* Totals */}
            <div className="md:flex justify-center sticky bottom-0 bg-main-bg pb-2 space-y-4">
              <div className="flex overflow-auto">
                <div className="flex items-center justify-center mt-2">
                  <p className="font-semibold text-theme-600 w-32">
                    Total Pieces: {totalPieces}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <p className="font-semibold text-theme-600 w-[175px]">
                    Total Carat: {totalCarat}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <p className="font-semibold text-theme-600 w-[175px]">
                    Total Price: ${formatNumber(totalPrice)}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <p className="font-semibold text-theme-600 w-[175px]">
                    Total Rap: {formatNumber(totalRap)}
                  </p>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <p className="font-semibold text-theme-600 w-[175px]">
                    Discount: {totalDiscount}%
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                {/* Search Button */}
                <div className="flex justify-center">
                  <button
                    onClick={addtocart}
                    className="bg-theme-600 md:text-sm text-xs text-white p-1 rounded-md hover:bg-theme-700"
                  >
                    Add to cart
                  </button>
                </div>
                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={addtowishlist}
                    className="bg-theme-600 md:text-sm text-xs text-white p-2 rounded-md hover:bg-theme-700"
                  >
                    Add to wishlist
                  </button>
                </div>
                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={exportToExcel}
                    className="bg-[#3E8F62] md:text-sm text-xs text-white p-2 rounded-md hover:bg-[#1D6F42]"
                  >
                    Export to Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}