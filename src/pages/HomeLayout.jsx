import React from "react";
// Outlet component allows the layout to be shared all across the children page elements
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// Hook provides info on state of application (loading, submitting...)
import { useNavigation } from "react-router-dom";

const HomeLayout = () => {
  // Accessing application info with useNavigation hook
  const navigation = useNavigation();
  console.log(navigation);
  const isPageLoading = navigation.state === "loading";
  const value = 'some value';
  return (
    <>
      <Navbar />
      {/* Styling all pages by adding css to the Outlet component 
      which contains all the pages (children) */}
      <section className="page">
      {/* Render loading spinner when app is in loading state
      otherwise render Outlet --> our app */}
      {/* Using context prop to pass data globally */}
        {isPageLoading ? <div className="loading" /> : <Outlet context={{value}} />}
      </section>
    </>
  );
};

export default HomeLayout;
