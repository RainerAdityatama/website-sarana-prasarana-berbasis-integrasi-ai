import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetDetailLaporanKerusakan } from "../../../service/admin_service/laporan_kerusakan/GetDetailLaporanKerusakan";

export default function GetDetailLaporanKerusakanLogic(id) {
    return useQuery({
        queryKey: ['laporan_kerusakan', 'detail-admin', id],
        queryFn: () => GetDetailLaporanKerusakan(id),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
}