import React, { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState("");

  return (
    <div className="w-fit flex items-center justify-center">
      <div className="relative w-full md:w-xs lg:w-md">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          className="border border-green-500 p-1 rounded-md w-full focus:outline-green-700 placeholder-slate-500 px-3 dark:placeholder-slate-300 pr-10"
        />

        <button disabled={text == ""}>
          <i
            disabled={text == ""}
            className="pi pi-search absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-95 dark:text-white cursor-pointer disabled:text-slate-500"
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
