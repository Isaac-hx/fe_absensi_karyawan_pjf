import { getCookie } from "@/helper/getCookie";
import React from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = getCookie("authToken") 
    return token ? <>{children}</> : <Navigate to={"/login-admin"}/>;
};

export default ProtectedRoute