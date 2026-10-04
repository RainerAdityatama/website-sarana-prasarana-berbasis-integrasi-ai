import { useQuery } from "@tanstack/react-query";
import { GetDetailBarang } from "../../../service/admin_service/barang/GetDetailBarang";

export default function DetailBarangLogic(id) {
    return useQuery({
        queryKey: ['barang', 'detail_stock', id],
        queryFn: () => GetDetailBarang(id),
        staleTime: 1000 * 60 * 5,
    });
}