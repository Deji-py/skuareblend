import Chip from "./MicroComps/Chip";
import React from "react";
import { Divider, Flex } from "@chakra-ui/react";

function SearchBar({ queryText, setQueryText, handleSearch }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="px-2  sticky   top-0  md:top-0 w-full md:w-[100vw] bg-white   "
    >
      <div class="relative">
        <input
          autoFocus={true}
          onChange={(e) => setQueryText(e.target.value)}
          type="search"
          id="default-search"
          class="block w-full  px-3 py-2 md:px-2   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500"
          placeholder="Search Mockups, Logos..."
          required
          value={queryText}
        />
        <button
          onClick={handleSearch}
          type="submit"
          class="text-white absolute h-full w-fit right-0 bottom-0 bg-primary hover:bg-gray-900  font-medium rounded-r-lg text-sm px-4 py-2   "
        >
          <svg
            class="w-4 md:w-3 h-4 md:h-3 text-white dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
      <Flex alignItems={"center"} gap={2} my={2}>
        <Chip label={"entertainment"} />
        <Chip label={"Energy"} />
        <Chip label={"News"} />
      </Flex>
      <Divider />
    </form>
  );
}

export default SearchBar;
