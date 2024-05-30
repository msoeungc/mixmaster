import React from "react";
import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return (
      <h4 style={{ textAlign: "center" }}>No matching cocktails found...</h4>
    );
  }

//   Mapping over list of drinks and extracting and renaming the properies we want
  const formattedDrinks = drinks.map((drink) => {
    // Destructring our drink object and extracting the properties we need
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = drink;
    // Returning a drink object with renamed properties
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return <Wrapper>
  {/* Mapping through our drink list, passing all the properties into CocktailCard component */}
    {formattedDrinks.map((drink) => {
        return <CocktailCard key={drink.id} {...drink} />
    })}
  </Wrapper>;
};

export default CocktailList;
