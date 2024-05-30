import React from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

// Url with data from cocktail dbi
// query string
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      // Make request to API with Url and id via axios
      // Destructure response object from request to pull out data property
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

// Loader function - gets access of the data object which gives us the params obj --> id
// destructure data object to get params
export const loader =
  (queryClient) =>
  async ({ params }) => {
    // destructure params property to get id
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    // Return id and data
    return { id };
  };

const Cocktail = () => {
  // useLoaderData hook gives us access to loader object, destructure to pull out id and data
  const { id } = useLoaderData();

  // Getting data from useQuery instead of useLoaderData
  const { data } = useQuery(singleCocktailQuery(id));
  // Handling error if URL is wrong during loader prompting the API to return null
  // instead of handling it in SinglePageError
  if (!data) {
    // If error in id, return user to home using Navigate component from react-router-dom
    return <Navigate to="/" />;
  }

  // Data fetched has drinks as an array to we want to get the first item in the array (our single drink)
  const singleDrink = data.drinks[0];

  // Destructure singleDrink object and pull out properties we want to use and rename the properties
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  // Creating array of singleDrink properties
  // filter out array for properties that start with 'strIngredient'
  const validIngredients = Object.keys(singleDrink)
    // Check if strIngredient has a value not null
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    // map through 'strIngredient' properties array and pull out their value
    .map((key) => singleDrink[key]);
  // console.log(validIngredients);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {/* mapping over validIngredients array and rendering the list */}
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {/* adding , unless last item of list */}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
