import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditKembalikanPeminjamanPublic } from "../../../service/public_service/peminjaman/EditKembalikanPeminjaman";
import toast from "react-hot-toast";

export default function EditDikembalikanPeminjamanPublicLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: EditKembalikanPeminjamanPublic,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil mengembalikan barang peminjaman", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}