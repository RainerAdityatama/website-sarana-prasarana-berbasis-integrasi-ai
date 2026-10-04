import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditStokBarang } from "../../../service/admin_service/stok_barang/EditStokBarang";
import toast from "react-hot-toast";

export default function EditStokBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: EditStokBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil mengubah data barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}