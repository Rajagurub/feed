import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/Login';
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: ReactNode;
}

interface UserStorage {
  UserIsLogged?: boolean;
}

interface TokenStorage {
  useAuth?: string | null;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

 const isAuth = Cookies.get("isAuthenticated");


  if (!isAuth) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} replace />;
  }

  return <>{children}</>;
}