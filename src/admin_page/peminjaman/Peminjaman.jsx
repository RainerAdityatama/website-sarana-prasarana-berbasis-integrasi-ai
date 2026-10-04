import {
    ClipboardList,
    Filter,
    Trash2,
    Plus
} from 'lucide-react';
import NavbarAdmin from '../../component/navbar/NavbarAdmin';
import GetAllPeminjaman from '../../logic/admin_logic/peminjaman/GetAllPeminjaman';
import Loading from '../../loading/Loading';
import ErrorComponents from '../../component/error_components/ErrorComponents';
import { formatDMY } from '../../component/date_format/DateFormat';
import { useState } from 'react';
import GetStokForTambahPeminjamanLogic from '../../logic/admin_logic/stok_barang/GetStokForTambahPeminjaman';
import TambahPeminjamanModal from '../../component/modal/peminjaman/tambah/TambahPeminjamanModal';
import EditDikembalikanPeminjamanModal from '../../component/modal/peminjaman/edit/EditDikembalikanPeminjamanModal';
import EditHilangPeminjamanModal from '../../component/modal/peminjaman/edit/EditHilangPeminjamanModal';
import HapusPeminjamanModal from '../../component/modal/hapus_modal/HapusPeminjaman';

export default function PeminjamanAdmin() {
    const [filterStatus, setFilterStatus] = useState(null);
    const { data, isLoading, isError, error, isFetching } = GetAllPeminjaman(filterStatus);
    const peminjaman = data?.data || [];
    const [tambahModal, setTambahModal] = useState(false);
    const { data: dataStok, isLoading: isLoadingStok, isError: isErrorStok, error: errorStok, isFetching: isFetchingStok } = GetStokForTambahPeminjamanLogic();
    const [editDikembalikanModal, setEditDikembalikanModal] = useState(null);
    const [editHilangModal, setEditHilangModal] = useState(null);
    const [hapusModal, setHapusModal] = useState(null);

    // Helper function untuk mewarnai badge status
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

    const handleFilterChange = (e) => {
        const val = e.target.value;

        setFilterStatus(val === "" ? null : val)
    }

    return (
        <>
            {isLoading || isLoadingStok ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                    <NavbarAdmin />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-brand-dark">Log Peminjaman</h1>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter size={16} className="text-gray-400" />
                                    </div>
                                    <select value={filterStatus || ''} onChange={handleFilterChange} className="block w-full sm:w-auto pl-10 pr-8 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary border outline-none bg-white appearance-none cursor-pointer shadow-sm">
                                        <option value="">Semua Status</option>
                                        <option value="dipinjam">Sedang Dipinjam</option>
                                        <option value="dikembalikan">Sudah Dikembalikan</option>
                                        <option value="hilang">Hilang</option>
                                    </select>
                                </div>

                                <button onClick={() => setTambahModal(true)} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shadow-sm">
                                    <Plus size={18} />
                                    Tambah Peminjaman
                                </button>
                            </div>
                        </div>

                        {isError ? (
                            <ErrorComponents error={error} judul="Peminjaman" />
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                                <th className="py-4 px-6 font-semibold w-16">No</th>
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
                                            ) : peminjaman && peminjaman.length > 0 ? peminjaman.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                                    <td className="py-4 px-6 font-medium text-gray-900">{item.item_stocks?.kode_label}</td>
                                                    <td className="py-4 px-6 text-gray-700">{item.nama_peminjam}</td>
                                                    <td className="py-4 px-6 text-gray-500">{item.lokasi}</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(item.status)}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500">{formatDMY(item.borrowed_at)}</td>
                                                    <td className="py-4 px-6 text-gray-500">{item.returned_at === null ? "-" : formatDMY(item.returned_at)}</td>
                                                    <td className="py-4 px-6">
                                                        {item.status === 'dipinjam' ? (
                                                            <div className="flex justify-center gap-3">
                                                                <button onClick={() => setEditDikembalikanModal(item)} className='text-white bg-brand-primary px-2 py-2 rounded-xl font-medium cursor-pointer'>
                                                                    Kembalikan
                                                                </button>
                                                                <button onClick={() => setEditHilangModal(item)} className='text-white bg-red-600 px-2 py-2 rounded-xl font-medium cursor-pointer'>
                                                                    Tandai Hilang
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex justify-center">
                                                                <button onClick={() => setHapusModal(item.id)}
                                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                                    title="Hapus Peminjaman"
                                                                >
                                                                    <Trash2 size={23} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td className="text-center py-12" colSpan={8}>
                                                        <ClipboardList className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                                        <p className="text-gray-500 text-sm">Belum ada riwayat peminjaman.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </main>

                    <TambahPeminjamanModal isOpen={tambahModal} data={dataStok} isError={isErrorStok} error={errorStok} onClose={() => setTambahModal(false)} isFetchingStok={isFetchingStok} />

                    {editDikembalikanModal && (
                        <EditDikembalikanPeminjamanModal data={editDikembalikanModal} onClose={() => setEditDikembalikanModal(null)} />
                    )}

                    {editHilangModal && (
                        <EditHilangPeminjamanModal data={editHilangModal} onClose={() => setEditHilangModal(null)} />
                    )}

                    {hapusModal && (
                        <HapusPeminjamanModal id={hapusModal} onClose={() => setHapusModal(null)} />
                    )}
                </div>
            )}
        </>
    )
}