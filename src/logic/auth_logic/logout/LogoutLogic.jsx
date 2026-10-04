import { useNavigate } from "react-router-dom";
import { useAuth } from '../../../auth_context/AuthContext'
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supabase } from "../../../api/supabase";

export default function LogoutLogic() {
    const navigate = useNavigate();
    const { setIsLoggingOut } = useAuth();

    const queryClient = useQueryClient();

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            queryClient.clear();

            navigate("/portal-web-sarpras-afm/masuk");
        } catch (error) {
            toast.error(error.message || "Gagal melakukan logout");
        } finally {
            setTimeout(() => {
                setIsLoggingOut(false);
            }, 200);
        }
    }

    return { handleLogout }
}