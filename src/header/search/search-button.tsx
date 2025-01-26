"use client";
import { useState } from "react";
import Search from "./search";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "@/components/ui/button";

const NewsSearch = () => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  return (
    <div className="relative">
      <Button
        onClick={() => setIsSearching(!isSearching)}
        type="button"
        className="rounded-full px-3 bg-accent hover:bg-red-800"
      >
        {!isSearching ? <FaSearch /> : <MdOutlineCancel />}
      </Button>
      {isSearching && (
        <div className="absolute right-0 top-14 w-[80vw] bg-white shadow-xl border-t border-gray-100 border-solid px-8 py-6 rounded-xl">
          <Search />
        </div>
      )}
    </div>
  );
};

export default NewsSearch;
