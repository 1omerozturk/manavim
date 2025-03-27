"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Dışarı tıklandığında önerileri kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (text.trim()) {
      router.push(`/search?q=${encodeURIComponent(text.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="w-fit flex items-center justify-center" ref={searchRef}>
      <div className="relative w-full md:w-xs lg:w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className={`w-full px-4 py-2 rounded-full border-2 transition-all duration-300
              ${isFocused 
                ? "border-green-500 dark:border-green-300 shadow-lg shadow-green-500/20 dark:shadow-green-300/20" 
                : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700"
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:focus:ring-green-300/20
              pr-12`}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full
              transition-all duration-300
              ${text.trim() 
                ? "text-green-500 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20" 
                : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
          >
            <i className="pi pi-search text-lg"></i>
          </button>
        </form>

        {/* Arama Önerileri */}
        {showSuggestions && text.trim() && (
          <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="py-2">
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                Popüler Aramalar
              </div>
              <div className="space-y-1">
                {["Elma", "Muz", "Domates", "Salatalık"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setText(suggestion);
                      handleSearch({ preventDefault: () => {} });
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
