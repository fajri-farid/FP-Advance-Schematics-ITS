import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./component/pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailProduct from "./component/pages/detail-product.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail-product/:productId",
    element: <DetailProduct />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
