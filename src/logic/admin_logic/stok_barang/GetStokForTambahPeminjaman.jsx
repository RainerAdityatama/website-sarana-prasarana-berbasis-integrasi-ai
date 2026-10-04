import { useQuery } from "@tanstack/react-query";
import { GetStokForTambahPeminjaman } from "../../../service/admin_service/stok_barang/GetStokForTambahPeminjaman";

export default function GetStokForTambahPeminjamanLogic() {
    return useQuery({
        queryKey: ['stok_barang', 'untuk_tambah_peminjaman'],
        queryFn: GetStokForTambahPeminjaman,
        staleTime: 1000 * 60 * 5,
    });
}