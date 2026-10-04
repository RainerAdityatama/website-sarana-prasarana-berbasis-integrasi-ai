import { Outlet } from "react-router-dom";
import { useAuth } from "../auth_context/AuthContext";
import Halaman404 from "../auth_page/404_page/404Page";
import Loading from "../loading/Loading";

export default function PrivateRoute() {
    const { session, isLoading, isLoggingOut } = useAuth();

    if (isLoading || isLoggingOut) return <Loading />

    if (!session) return <Halaman404 />

    return <Outlet />
}