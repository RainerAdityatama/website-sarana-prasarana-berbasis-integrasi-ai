import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HapusStokBarang } from "../../../service/admin_service/stok_barang/HapusStokBarang";

export default function HapusStokBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: HapusStokBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menghapus data stok barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}