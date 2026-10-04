import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBarang } from "../../../service/admin_service/barang/EditBarang";
import toast from "react-hot-toast";

export default function EditBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil mengubah data stok barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["barang"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}