import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateForm from "./pages/createForm/CreateForm";
import User from "pages/User/User";

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <Auth />,
    },
    {
      path: "/login",
      element: <Auth isSigned />,
    },
    {
      path: "/create-form",
      element: <CreateForm />,
    },
    {
      path: "/user",
      element: <User />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position={"top-right"}
        toastOptions={{
          duration: 3000,
        }}
      />
    </>
  );
}
