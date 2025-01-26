import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="w-full relative">
      <Input
        className="!focus-visible:!border-none"
        type="text"
        placeholder="search"
      />
      <button
        type="button"
        className="bg-accent text-white px-3 rounded-full absolute inset-y-0 inset-x-auto right-0"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
