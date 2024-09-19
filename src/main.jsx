import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./component/pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailProduct from "./component/pages/detail-product.jsx";
import Register from "./component/pages/register.jsx";
import Login from "./component/pages/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail-product/:productId",
    element: <DetailProduct />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
