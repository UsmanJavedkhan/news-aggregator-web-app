import React from "react";
import { categories } from "./TrendingSection";

function CategoryDropdown({ selectedCategory, onChange }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="border px-5 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default CategoryDropdown;
