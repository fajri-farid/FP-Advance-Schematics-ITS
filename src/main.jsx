import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./component/pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailProduct from "./component/pages/detail-product.jsx";
import Register from "./component/pages/register.jsx";
import Login from "./component/pages/login.jsx";
import Cart from "./component/pages/cart.jsx";
import Wishlist from "./component/pages/wishlist.jsx";
import PrivateRoute from "./component/private-route.jsx";

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
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <Wishlist />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
