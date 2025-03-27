"use client";

import React from "react";
import { useDarkMode } from "../context/ThemeContext";

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center">
      {darkMode ? (
        <i
          title="Switch Light Theme"
          onClick={() => setDarkMode(!darkMode)}
          className="pi pi-sun text-white text-lg cursor-pointer"
        ></i>
      ) : (
        <i
          title="Switch Dark Theme"
          onClick={() => setDarkMode(!darkMode)}
          className="pi pi-moon text-black text-lg cursor-pointer"
        ></i>
      )}
    </div>
  );
};

export default DarkModeToggler;
