import React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }:{children:React.ReactNode}) {
  const token = useAppSelector((s:any)=>s.auth.token);
  if (!token) {
    toast.info("Please sign in to access this page");
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
