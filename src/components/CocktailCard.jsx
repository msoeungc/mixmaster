import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";

const CocktailCard = ({ id, name, image, info, glass }) => {
  // Invoke useOutletContext hook to access context data passed down by parent
  // const data = useOutletContext();
  // console.log(data);
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        {/* Link to navigate to Single Cocktail page using route parameter */}
        <Link to={`/cocktail/${id}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;
