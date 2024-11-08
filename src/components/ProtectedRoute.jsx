import React from "react";
import { Navigate } from "react-router-dom";
import pb from "../pocketbase";

const ProtectedRoute = ({ children }) => {{
    const isAuthenticated = pb.authStore.isValid;
    return isAuthenticated ? children : <Navigate to="/login" />;
};
}

export default ProtectedRoute