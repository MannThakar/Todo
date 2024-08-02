import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(
    localStorage.getItem("accessToken") !== null
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuth(true);
      console.log("token", token);
    } else {
      setAuth(false);
    }
  }, []);

  if (auth === undefined) {
    // Render nothing or a loading indicator while determining auth status
    return null;
  }

  return auth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
