import React from "react";
import { HiOutlineX } from "react-icons/hi";

export const SearchBar: React.FC<{ toggleSearch: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    toggleSearch
  }) => (
          <div className="absolute top-0 left-0 w-full bg-white p-4 shadow-md z-50">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <HiOutlineX
                className="w-6 h-6 cursor-pointer ml-2"
                onClick={() => toggleSearch(false)}
              />
            </div>
            <div className="mt-2">
              <span className="block text-sm font-semibold">Popular searches</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Shoes", "Winter", "Coats", "Women", "Kids"].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
  );