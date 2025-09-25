
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import CategoryDropdown from "./CategoryDropdown";

function SearchBar({ onSearch, category, setCategory }) {
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fromDate && toDate && toDate < fromDate) {
      alert("End date cannot be before start date");
      return;
    }

    onSearch(
      query,
      fromDate ? format(fromDate, "yyyy-MM-dd") : "",
      toDate ? format(toDate, "yyyy-MM-dd") : ""
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center ml-9  space-y-2 sm:space-y-0 sm:space-x-2 mb-6"
    >
      {/* Search input */}
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="flex-1 min-w-[250px] ml-2"
      />

      {/* From Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate ? format(fromDate, "yyyy-MM-dd") : <span>From date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={setFromDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* To Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {toDate ? format(toDate, "yyyy-MM-dd") : <span>To date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={setToDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Category Dropdown */}
      <CategoryDropdown
        selectedCategory={category}
        onChange={(cat) => setCategory(cat)}
      />

      <Button type="submit" variant="">Search</Button>
    </form>
  );
}

export default SearchBar;


