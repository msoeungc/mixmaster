// createBrowserRouter hook for array of routes
// RouterProvider component to render the pages within the router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// importing all our page components
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from "./pages";

// importing loader function and giving it an alias
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";

// importing action function and giving it an alias
import { action as newsletterAction } from "./pages/Newsletter";

// Constructing the QueryClient object to cache requests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5mins
    },
  },
});

// createBrowserRouter hook used to provide different pages as an array of objects
// each object having 2 main keys (can have more keys), (path and element)
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // Children array for nested pages within the HomeLayout page
    // All nested children paths are relative to the parent path
    // Errors bubble up levels to important to have an errorElement in the parent page
    errorElement: <Error />,
    children: [
      {
        // Designating an index page as our "homepage" with parent's path '/'
        index: true,
        // Reusable error page with access to error object
        errorElement: <SinglePageError />,
        // Adding loader function, gets data before render
        // pass in our queryClient instance and invoking the landingLoader - runs right away
        loader: landingLoader(queryClient),
        element: <Landing />,
      },
      {
        // Assign a route parameter for cocktail id
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        // action prop pointing to our action function - to access formData
        action: newsletterAction,
      },
      {
        path: "error",
        element: <Error />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    // Wrapping our app in QueryClientProvider comp and passing in queryClient
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
