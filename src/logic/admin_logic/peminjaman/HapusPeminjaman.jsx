import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HapusPeminjaman } from "../../../service/admin_service/peminjaman/HapusPeminjaman";
import toast from "react-hot-toast";

export default function HapusPeminjamanLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: HapusPeminjaman,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menghapus data peminjaman", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}