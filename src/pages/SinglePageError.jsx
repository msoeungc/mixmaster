// Reusable error page component
import React from "react";
// Gives us access to error object
import { useRouteError } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);
  // return <h2>{error.message}</h2>;
  return <h2>There was an error...</h2>;
};

export default SinglePageError;
