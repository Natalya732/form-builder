import React from "react";
import "../node_modules/primeflex/primeflex.css";

import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateForm from "./pages/createForm/CreateForm";
import User from "pages/User/User";
import SavedFormViewer from "components/SavedFormViewer";
import AllSubmissions from "pages/AllSubmissions/AllSubmissions";

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
      path: "/create-form/:id?",
      element: <CreateForm />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/submissions/:formId?",
      element: <AllSubmissions />,
    },
    {
      path: "/forms/:id?",
      element: <SavedFormViewer />,
    }
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
