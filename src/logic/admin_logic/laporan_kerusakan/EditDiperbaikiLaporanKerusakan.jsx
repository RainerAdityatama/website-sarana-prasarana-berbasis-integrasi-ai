import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { EditDiperbaikiLaporanKerusakan } from "../../../service/admin_service/laporan_kerusakan/EditDiperbaikiLaporanKerusakan";

export default function EditDiperbaikiLaporanKerusakanLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: EditDiperbaikiLaporanKerusakan,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil merubah status laporan kerusakan menjadi sedang diperbaiki", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["laporan_kerusakan"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    });
}