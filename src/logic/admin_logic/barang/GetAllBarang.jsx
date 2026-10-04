import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetAllBarangAdmin } from "../../../service/admin_service/barang/GetAllBarang";

export default function GetAllBarangAdminLogic(filter) {
    return useQuery({
        queryKey: ['barang', 'admin', filter],
        queryFn: () => GetAllBarangAdmin(filter),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
}