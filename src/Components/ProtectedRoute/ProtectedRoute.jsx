import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../Login/Login";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") == null) {
    return <Navigate to={'/Login'}/>;
  } else {
    return props.children;
  }
}
