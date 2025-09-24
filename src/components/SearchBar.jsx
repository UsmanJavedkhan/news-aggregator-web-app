import React, { useState } from "react";

import { Input } from "./ui/input";
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
 
     if (toDate < fromDate) {
    alert("End date cannot be before start date");
    return;
  }
     onSearch(query, fromDate, toDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6"
    >
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="flex-1 border rounded-md px-4 py-2 ml-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Input />

      {/* From date */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border rounded-md px-3 py-2"
      />

      {/* To date */}
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border rounded-md px-3 py-2"
      />
      {/* <Input /> */}

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
