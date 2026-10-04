import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TambahPeminjaman } from "../../../service/admin_service/peminjaman/TambahPeminjaman";
import toast from "react-hot-toast";

export default function TambahPeminjamanLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TambahPeminjaman,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menambah data peminjaman", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}