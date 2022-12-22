import { useLocation, Navigate } from 'react-router-dom'

import useAuth from 'utils/useAuth';

export default function RequireAuth({ children }) {
  const  { authStatus }  = useAuth();
  const location = useLocation();
  console.log("AuthStatus======",authStatus)
  if(authStatus === undefined) return null;
  return authStatus === true
    ? children
    : <Navigate to="/" replace state={{ from: location }} />;
}