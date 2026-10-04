import { useQuery } from "@tanstack/react-query";
import { GetDetailStok } from "../../../service/admin_service/stok_barang/GetDetailStok";

export default function GetDetailStokBarang(id) {
    return useQuery({
        queryKey: ['stok_barang', 'detail_admin', id],
        queryFn: () => GetDetailStok(id),
        staleTime: 1000 * 60 * 5,
    });
}