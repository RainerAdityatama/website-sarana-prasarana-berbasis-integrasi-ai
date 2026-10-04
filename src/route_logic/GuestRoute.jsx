import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth_context/AuthContext";
import Loading from "../loading/Loading";

export default function GuestRoute() {
    const { session, isLoading } = useAuth();

    if (isLoading) return <Loading />

    if (session) return <Navigate to="/portal-akses-admin-web-sarpras-afm/barang" replace />

    return <Outlet />
}