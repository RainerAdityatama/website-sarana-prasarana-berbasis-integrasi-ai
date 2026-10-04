import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PulihkanStokBarang } from "../../../service/admin_service/stok_barang/PulihkanStokBarang";
import toast from "react-hot-toast";

export default function PulihkanStokBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: PulihkanStokBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil memulihkan stok barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}