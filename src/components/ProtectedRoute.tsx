import React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }:{children:React.ReactNode}) {
  const token = useAppSelector((s:any)=>s.auth.token);
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
