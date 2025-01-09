import { Navigate, useLocation } from "react-router-dom";
import useUsers from "../hooks/useUsers";

const PrivateRout = ({ children }) => {
  const { user, loading } = useUsers();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRout;
