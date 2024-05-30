import React from "react";
// Gives access to loader data
import { useLoaderData } from "react-router-dom";
// API help
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

// Base URL for cocktail search request
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Function using useQuery to handle search requests and default
// results of search query are cached
const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

// Access request for loader function and get input value from SearchForm
// loader a function that grabs queryClient and returns another function, this gives
// the loader request access to queryClient on render
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    // set searchTerm to url object with parameter searchParams and get 'name of input'
    // or set to empty string
    const searchTerm = url.searchParams.get("search") || "";
    // Invoke ensure method and pass in search query and search term- checks if this data is in the cache or no
    // if no then we fetch it
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
    // axios get function, pass in DB url and search term
    // returning object with a drinks property and searchTerm
    return { searchTerm };
  };

const Landing = () => {
  // destructure loader data into drinks and searchTerm
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
