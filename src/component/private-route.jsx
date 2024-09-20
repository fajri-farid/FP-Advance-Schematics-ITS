import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
