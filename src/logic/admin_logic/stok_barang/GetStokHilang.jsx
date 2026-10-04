import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetStokHilang } from "../../../service/admin_service/stok_barang/GetStokHilang";

export default function GetStokHilangLogic() {
    return useQuery({
        queryKey: ['stok_barang', 'hilang'],
        queryFn: GetStokHilang,
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    })
}