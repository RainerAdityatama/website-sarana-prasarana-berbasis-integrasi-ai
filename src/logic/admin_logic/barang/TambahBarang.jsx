import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBarang } from "../../../service/admin_service/barang/TambahBarang";
import toast from "react-hot-toast";

export default function TambahBarangLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBarang,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menambah data barang", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}