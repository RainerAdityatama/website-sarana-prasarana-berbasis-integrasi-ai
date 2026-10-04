import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../../api/supabase";

export default function LoginLogic() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastLoading = toast.loading("Sedang Masuk...");

        try {
            // melakukan trigger terhadap perubahan state pada auth supaya bisa mendeteksi perubahan state user ketika login 
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) return error;

            toast.success("Berhasil login, selamat datang", { id: toastLoading });
            navigate("/portal-akses-admin-web-sarpras-afm/barang");
        } catch (error) {
            toast.error(error || "Gagal melakukan login, silahkan periksa email dan password anda", { id: toastLoading });
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, email, setEmail, password, setPassword, loading };
}