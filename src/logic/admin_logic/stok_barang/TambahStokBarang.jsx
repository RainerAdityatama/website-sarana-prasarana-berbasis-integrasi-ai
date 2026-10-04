import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TambahStokBarang } from "../../../service/admin_service/stok_barang/TambahStokBarang";
import toast from "react-hot-toast";

export default function TambahStokBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TambahStokBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menambah data stok barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}