import { useState, type PropsWithChildren } from "react";
import { AuthContext } from "../contexts";
import type { AuthenticatedUser } from "../types";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const handleLoginState = (user: AuthenticatedUser) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const handleLogoutState = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext
      value={{ isAuthenticated, user, handleLoginState, handleLogoutState }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
