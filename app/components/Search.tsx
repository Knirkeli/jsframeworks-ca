"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { SearchIcon } from "lucide-react";
import useProductStore, { State } from "../../store/cart"; // Import your Zustand store and State interface
import "../../app/globals.css";

export default function Search() {
  const setSearchTerm = useProductStore(
    (state) => (state as State).setSearchTerm
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-center items-center w-1/4 mx-auto">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="w-1/2 border-black border-1 text-center"
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
