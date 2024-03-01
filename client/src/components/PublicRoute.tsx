import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useUserContext();
  if (user) return <Navigate to="/" replace />;
  return children;
}

export default PublicRoute;
