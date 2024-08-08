import React from "react";
import SignIn from "./pages/signIn/SignIn";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import CreateForm from "./pages/createForm/CreateForm";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/dashboard",
      element: <Home />,
    },
    {
      path: "/create-form",
      element: <CreateForm />,
    },
  ]);
  return <RouterProvider router={router} />;
}
