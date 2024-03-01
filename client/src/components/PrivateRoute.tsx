import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default PrivateRoute;
