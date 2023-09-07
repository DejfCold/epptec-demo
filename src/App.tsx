import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ROUTES} from "./router";

export default function App() {
  const router = createBrowserRouter(ROUTES)

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  );
}