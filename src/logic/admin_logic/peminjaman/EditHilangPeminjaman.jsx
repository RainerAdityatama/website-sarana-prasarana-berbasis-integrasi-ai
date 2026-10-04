import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditHilangPeminjaman } from "../../../service/admin_service/peminjaman/EditHilangPeminjaman";
import toast from "react-hot-toast";

export default function EditHilangPeminjamanLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: EditHilangPeminjaman,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menandai hilang barang peminjaman", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}