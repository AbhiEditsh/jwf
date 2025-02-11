import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const AdminRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user && user.role === "admin" ? element : <Navigate to="/" />;
};

export default AdminRoute;
