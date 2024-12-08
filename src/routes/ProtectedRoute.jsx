import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  isLoading,
  redirectedPath = "/login",
}) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectedPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
