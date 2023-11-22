import { Navigate, Outlet } from "react-router-dom";
import { useJobAllowStatus } from "../hooks/useJobAllowStatus";
import Spinner from "./Spinner";

function SubscribedRoute() {
  const { isAllow, checking } = useJobAllowStatus();

  if (checking) {
    return <Spinner />;
  }
  return !checking && isAllow ? <Outlet /> : <Navigate to="/subscription" />;
}

export default SubscribedRoute;
