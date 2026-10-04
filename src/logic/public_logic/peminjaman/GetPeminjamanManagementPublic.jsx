import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetPeminjamanManagementPublic } from "../../../service/public_service/peminjaman/GetDetailPeminjamanPublic";

export default function GetPeminjamanManagementPublicLogic(id) {
    return useQuery({
        queryKey: ['peminjaman', 'managemen-public', id],
        queryFn: () => GetPeminjamanManagementPublic(id),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5
    });
}