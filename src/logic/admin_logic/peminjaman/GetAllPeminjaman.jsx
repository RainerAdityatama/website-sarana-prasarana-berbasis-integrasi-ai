import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetAllPeminjamanAdmin } from "../../../service/admin_service/peminjaman/GetAllPeminjaman";

export default function GetAllPeminjaman(filterStatus) {
    return useQuery({
        queryKey: ['peminjaman', 'admin', filterStatus],
        queryFn: () => GetAllPeminjamanAdmin(filterStatus),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
}