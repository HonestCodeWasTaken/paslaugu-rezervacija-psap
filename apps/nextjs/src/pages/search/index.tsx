"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const SearchQuery = search ? search?.get("q") : null;
  const encodedSearchQuery = encodeURI(SearchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
  );

  console.log("SEARCH PARAMS", encodedSearchQuery);

  return <div> SEARCH PAGE</div>;
};

export default SearchPage;
