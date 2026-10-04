import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TambahLaporanKerusakan } from "../../../service/public_service/laporan_kerusakan/TambahLaporanKerusakan";
import toast from "react-hot-toast";

export default function TambahLaporanKerusakanPublicLogic() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: TambahLaporanKerusakan,

        onMutate: () => {
            const toastLoading = toast.loading("Sedang memproses data...");
            return { toastLoading };
        },

        onSuccess: (data, variables, contextToastId) => {
            toast.success("Berhasil melaporkan kerusakan barang, silahkan tunggu perbaikan yang akan dilakukan oleh divisi Sarpras", { id: contextToastId.toastLoading });
            queryClient.invalidateQueries({ queryKey: ["laporan_kerusakan"] });
            queryClient.invalidateQueries({ queryKey: ["stok_barang"] });
        },

        onError: (error, variables, contextToastId) => {
            toast.error(error.message, { id: contextToastId.toastLoading });
            console.log(error.message);
        }
    })
}