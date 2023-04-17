import App from "./App";
import { createHashRouter, createBrowserRouter } from "react-router-dom";
// import { SignUp } from "./components/SignUp";
// import { LogIn } from "./components/LogIn";
import React from "react";
import Navigation from "./Components/Navbar";
import ErrorPage from "./Components/ErrorPage";
import SignUp from "./Components/SignUp";
import HomePage from "./Components/Homepage";


const Router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

    ],
  },
]);

export default Router;
