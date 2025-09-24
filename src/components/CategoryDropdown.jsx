import React from "react";
 import { categories } from "./TrendingSection"; 
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function CategoryDropdown({ selectedCategory, onChange }) {
  return (
    <div className="mb-6 ">
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          {selectedCategory || "Select Category"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        {categories.map((cat) => (
          <DropdownMenuItem
            key={cat}
            className="capitalize cursor-pointer"
            onClick={() => onChange(cat)}
          >
            {cat}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}

export default CategoryDropdown;
