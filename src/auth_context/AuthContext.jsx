import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { useQuery } from "@tanstack/react-query";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        // inisiasi awal untuk mengambil session yang tersimpan
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsInitializing(false);
        });

        // otomatis mendeteksi jika ada perubahan state authnya
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession);
        });

        // Cleanup listener untuk mencegah memory leak
        return () => subscription.unsubscribe();
    }, []);

    const { data: admin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['admin', session?.user?.id],
        queryFn: async () => {
            if (!session?.user?.id) return null;

            const { data, error } = await supabase.from('admins').select('*').eq('id', session.user.id).single();

            if (error) throw error;
            return data;
        },
        enabled: !!session?.user?.id, // Cegah query berjalan sebelum user login
        staleTime: 1000 * 60 * 5, // Cache 5 menit
    });

    const isLoading = isInitializing || isAdminLoading;

    return (
        <AuthContext.Provider value={{ session, isLoggingOut, admin, isLoading, setIsLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);