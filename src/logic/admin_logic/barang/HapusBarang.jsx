import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HapusBarangLogic } from "../../../service/admin_service/barang/HapusBarang";
import toast from "react-hot-toast";

export default function HapusBarang() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: HapusBarangLogic,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menghapus data barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["barang"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}