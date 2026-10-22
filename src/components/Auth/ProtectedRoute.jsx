
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ allowedRole }) {
  const location = useLocation();

  const token =
    localStorage.getItem("rehabics_token") ||
    sessionStorage.getItem("rehabics_token");

  const userString =
    localStorage.getItem("rehabics_user") ||
    sessionStorage.getItem("rehabics_user");

  if (!token || !userString) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userString);
  } catch {
    localStorage.removeItem("rehabics_token");
    localStorage.removeItem("rehabics_user");
    sessionStorage.removeItem("rehabics_token");
    sessionStorage.removeItem("rehabics_user");

    return <Navigate to="/login" replace />;
  }

  if (!user?.role) {
    localStorage.removeItem("rehabics_token");
    localStorage.removeItem("rehabics_user");
    sessionStorage.removeItem("rehabics_token");
    sessionStorage.removeItem("rehabics_user");

    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    const dashboardByRole = {
      patient: "/dashboard/patient",
      physiotherapist: "/dashboard/physiotherapist",
      admin: "/dashboard/admin",
    };

    return (
      <Navigate
        to={dashboardByRole[user.role] || "/login"}
        replace
      />
    );
  }

  return <Outlet />;
}
