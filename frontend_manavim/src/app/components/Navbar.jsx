"use client";

import React, { useState } from "react";
import DarkModeToggler from "./DarkModeToggler";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => setToggle(!toggle);

  return (
    <nav className="sticky backdrop-blur-sm top-0 z-50 flex flex-col w-full px-6 py-3 sm:shadow-xs shadow-black dark:shadow-white">
      {/* Üst kısım (logo ve butonlar) */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between space-x-10">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            Manav<span className="text-green-500 dark:text-green-300">IM</span>
          </div>
          <DarkModeToggler />
        </div>
        <SearchBar />
        <div className="md:hidden">
          <button
            onClick={handleClick}
            className="cursor-pointer"
            aria-label="Toggle Navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links for large screens */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="products" className="hover:underline">
            Products
          </a>
          <a href="#" className="hover:underline">
            Categories
          </a>
          <a href="#" className="hover:underline">
            Orders
          </a>
          <a href="#" className="hover:underline">
            Profile
          </a>
        </div>
      </div>

      {/* Links for mobile */}
      {toggle && (
        <div className="w-fit mt-3 py-3 px-4 space-y-3 md:hidden backdrop-blur-sm rounded-lg ">
          <a
            href="#"
            className="block py-2 hover:text-green-500 dark:hover:text-green-300 transition-colors"
            onClick={() => setToggle(false)}
          >
            Products
          </a>
          <a
            href="#"
            className="block py-2 hover:text-green-500 dark:hover:text-green-300 transition-colors"
            onClick={() => setToggle(false)}
          >
            Categories
          </a>
          <a
            href="#"
            className="block py-2 hover:text-green-500 dark:hover:text-green-300 transition-colors"
            onClick={() => setToggle(false)}
          >
            Orders
          </a>
          <a
            href="#"
            className="block py-2 hover:text-green-500 dark:hover:text-green-300 transition-colors"
            onClick={() => setToggle(false)}
          >
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
