import React from "react";
import diamond from "../assets/round.png";

export default function ProductNotFound() {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <div className="flex gap-4 items-center">
        <img src={diamond} alt="Diamond" />
        <div>
          <h1 className="font-quicksand text-center text-gray-600 dark:text-gray-300 font-semibold">
            Sorry!
          </h1>
          <span className="font-quicksand text-center text-gray-400 font-semibold">
            can't find the requested product
          </span>
        </div>

        <img src={diamond} alt="Diamond" />
      </div>
    </div>
  );
}
