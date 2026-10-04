import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetAllLaporanKerusakan } from "../../../service/admin_service/laporan_kerusakan/GetAllLaporanKerusakan";

export default function GetAllLaporanKerusakanLogic(filterStatus) {
    return useQuery({
        queryKey: ['laporan_kerusakan', 'admin', filterStatus],
        queryFn: () => GetAllLaporanKerusakan(filterStatus),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
}