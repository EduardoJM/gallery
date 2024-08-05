import { useAuth } from "@/modules/auth/contexts";
import { Navigate, Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="px-28">
      <Outlet />
    </div>
  )
};
