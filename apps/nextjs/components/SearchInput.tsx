"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [SearchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(SearchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);

    //console.log("current query", encodedSearchQuery);
  };

  return (
    <form className="flex justify-center w-2/3" onSubmit={onSearch}>
      <input
        value={SearchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3  flex-1  text-zinc-800 bg-zinc-800 rounded-full focus:outline-none "
        placeholder="Search"
      />
    </form>
  );
};

export default SearchInput;
