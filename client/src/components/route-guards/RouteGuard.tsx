import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import type { PropsWithChildren } from "react";

const RouteGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, user } = useAuth();
  const routes = useLocation();
  console.log(isAuthenticated);
  if (!isAuthenticated && routes.pathname !== "/auth")
    return <Navigate to="/auth" />;

  if (
    user &&
    user.role === "instructor" &&
    !routes.pathname.includes("instructor")
  )
    return <Navigate to="/instructor" />;

  if (user && user.role === "user" && routes.pathname !== "/home")
    return <Navigate to="/home" />;
  return children;
};

export default RouteGuard;
