"use client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-center items-center w-1/4 mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="w-1/2 border-black border-2"
      />
      <Button
        variant={"default"}
        className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-34 md:w-24 round"
      >
        <SearchIcon />
        <span className="text-xs font-semibold sm:block ml-2 hover"></span>
      </Button>
    </div>
  );
}
