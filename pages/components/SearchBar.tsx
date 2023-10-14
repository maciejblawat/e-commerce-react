import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import Dropdown from "./Dropdown";

interface SearchBarProps {
  visibility: string;
}

const SearchBar = ({ visibility }: SearchBarProps) => {
  const myResults: any[] = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      fetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = (term: string) => {
    axios
      .get(`your_backend_api_url/search?term=${term}`)
      .then((response) => {
        const results = response.data;
        setSearchResults(results);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };
  return (
    <div className={`${visibility}relative flex-1 lg:mx-24 sm:mx-8 mx-4`}>
      <div className="flex flex-1 items-center bg-white rounded-full px-2 justify-between border border-gray-100 shadow-md">
        <Dropdown />
        <input
          type="search"
          className="rounded-full border-0 focus:ring-0 hide-clear w-full"
          placeholder="maciek chuj"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <SearchResults results={myResults} />
    </div>
  );
};

export default SearchBar;
