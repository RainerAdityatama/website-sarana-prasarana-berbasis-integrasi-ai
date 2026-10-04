import { useParams } from "react-router-dom";
import { formatDMY } from "../component/date_format/DateFormat";
import ErrorComponents from "../component/error_components/ErrorComponents";
import GetPeminjamanManagementPublicLogic from "../logic/public_logic/peminjaman/GetPeminjamanManagementPublic";
import NavbarPublic from "../component/navbar/NavbarPublic";
import Loading from "../loading/Loading";
import EditDikembalikanPeminjamanPublicModal from "../component/modal/peminjaman/edit/EditDikembalikanPeminjamanModalPublic";
import { useState } from "react";

export default function HalamanPeminjamanManagementPublic() {
    const { id } = useParams();
    const { data: peminjaman, isError, error, isFetching, isLoading } = GetPeminjamanManagementPublicLogic(id);
    const [modalEdit, setModalEdit] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'dipinjam':
                return 'bg-blue-50 text-blue-700 border border-blue-200';
            case 'dikembalikan':
                return 'bg-green-50 text-green-700 border border-green-200';
            case 'hilang':
                return 'bg-red-50 text-red-700 border border-red-200';
            default:
                return 'bg-gray-50 text-gray-700 border border-gray-200';
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                    <NavbarPublic />

                    {isError ? (
                        <ErrorComponents error={error} judul="Peminjaman" />
                    ) : (
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl text-gray-500">Nomor Peminjaman: <span className="text-3xl font-bold text-brand-dark">{peminjaman?.id}</span></h1>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                                <th className="py-4 px-6 font-semibold">Barang Fisik</th>
                                                <th className="py-4 px-6 font-semibold">Nama Peminjam</th>
                                                <th className="py-4 px-6 font-semibold">Lokasi</th>
                                                <th className="py-4 px-6 font-semibold">Status</th>
                                                <th className="py-4 px-6 font-semibold">Waktu Pinjam</th>
                                                <th className="py-4 px-6 font-semibold">Waktu Kembali</th>
                                                <th className="py-4 px-6 font-semibold text-center w-28">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm">
                                            {isFetching ? (
                                                <tr>
                                                    <td className="text-center py-12" colSpan={8}>
                                                        <p className="text-gray-500 text-md">Mohon Tunggu...</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={peminjaman.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-medium text-gray-900">{peminjaman.item_stocks?.kode_label}</td>
                                                    <td className="py-4 px-6 text-gray-700">{peminjaman.nama_peminjam}</td>
                                                    <td className="py-4 px-6 text-gray-500">{peminjaman.lokasi}</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(peminjaman.status)}`}>
                                                            {peminjaman.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500">{formatDMY(peminjaman.borrowed_at)}</td>
                                                    <td className="py-4 px-6 text-gray-500">{peminjaman.returned_at === null ? "-" : formatDMY(peminjaman.returned_at)}</td>
                                                    <td className="py-4 px-6">
                                                        {peminjaman.status === 'dipinjam' ? (
                                                            <div className="flex justify-center gap-3">
                                                                <button onClick={() => setModalEdit(peminjaman)} className='text-white bg-brand-primary px-2 py-2 rounded-xl font-medium cursor-pointer'>
                                                                    Kembalikan
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <p className="text-center font-medium">-</p>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                    {modalEdit && (
                                        <EditDikembalikanPeminjamanPublicModal data={modalEdit} onClose={() => setModalEdit(null)} />
                                    )}
                                </div>
                            </div>
                        </main>
                    )}
                </div>
            )}
        </>
    )
}