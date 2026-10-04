import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TambahPeminjamanPublic } from "../../../service/public_service/peminjaman/TambahPeminjamanPublic";

export default function TambahPeminjamanPublicLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TambahPeminjamanPublic,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil melakukan peminjaman", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["peminjaman"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}