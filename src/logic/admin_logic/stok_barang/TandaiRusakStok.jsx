import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TandaiRusakStok } from "../../../service/admin_service/stok_barang/TandaiRusakStok";
import toast from "react-hot-toast";

export default function TandaiRusakStokLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TandaiRusakStok,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil mengubah status barang menjadi rusak", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
} 