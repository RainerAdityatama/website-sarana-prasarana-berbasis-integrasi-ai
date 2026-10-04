import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HapusLaporanKerusakan } from "../../../service/admin_service/laporan_kerusakan/HapusLaporanKerusakan";
import toast from "react-hot-toast";

export default function HapusLaporanKerusakanLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: HapusLaporanKerusakan,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil menghapus data laporan kerusakan", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["laporan_kerusakan"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
        }
    });
}