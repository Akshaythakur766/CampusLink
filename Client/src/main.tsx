import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router, store, UserContextProvider } from "@CampusLink/core";
import "./index.css";
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document?.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);
