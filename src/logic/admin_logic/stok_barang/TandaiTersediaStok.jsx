import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TandaiTersedia } from "../../../service/admin_service/stok_barang/TandaiTersedia";

export default function TandaiTersediaStokLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TandaiTersedia,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil mengubah status barang menjadi tersedia", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] })
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}