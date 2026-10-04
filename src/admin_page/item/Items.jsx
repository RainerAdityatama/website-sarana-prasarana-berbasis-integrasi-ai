import {
    Package,
    Plus,
    Edit,
    Trash2,
    Filter,
    Eye,
    ArrowRight,
} from 'lucide-react';
import NavbarAdmin from '../../component/navbar/NavbarAdmin';
import GetAllBarangAdminLogic from '../../logic/admin_logic/barang/GetAllBarang';
import Loading from '../../loading/Loading';
import ErrorComponents from '../../component/error_components/ErrorComponents';
import { useState } from 'react';
import { formatDMY } from '../../component/date_format/DateFormat';
import TambahBarangAdminModal from '../../component/modal/barang/tambah/TambahBarangAdmin';
import EditBarangAdminModal from '../../component/modal/barang/edit/EditBarangAdmin';
import HapusModalTemplate from '../../component/modal/hapus_modal/HapusModalTemplate';
import { Link } from 'react-router-dom';

export default function ItemsAdmin() {
    const [filter, setFilter] = useState(null);
    const { data, isLoading, isError, error, isFetching } = GetAllBarangAdminLogic(filter);
    const barang = data?.data || [];
    const [tambahModal, setTambahModal] = useState(false);
    const [editModal, setEditModal] = useState(null);
    const [hapusModal, setHapusModal] = useState(null);

    const handleFilterChange = (e) => {
        const val = e.target.value;

        setFilter(val === "" ? null : val);
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                    <NavbarAdmin />

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-brand-dark">Manajemen Barang</h1>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter size={16} className="text-gray-400" />
                                    </div>
                                    <select value={filter || ""} onChange={handleFilterChange} className="block w-full sm:w-auto pl-10 pr-8 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary border outline-none bg-white appearance-none cursor-pointer shadow-sm">
                                        <option value="">Semua Kategori</option>
                                        <option value="kebersihan">Kebersihan</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <button onClick={() => setTambahModal(true)} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shadow-sm">
                                    <Plus size={18} />
                                    Tambah Barang
                                </button>

                                <Link to="/portal-akses-admin-web-sarpras-afm/barang/hilang" className="inline-flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
                                    List Stok Barang Hilang
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                        {isError ? (
                            <ErrorComponents error={error} judul="Barang" />
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                                    <th className="py-4 px-6 font-semibold w-16">No</th>
                                                    <th className="py-4 px-6 font-semibold">Nama Barang</th>
                                                    <th className="py-4 px-6 font-semibold">Kategori</th>
                                                    <th className="py-4 px-6 font-semibold">Dibuat Pada</th>
                                                    <th className="py-4 px-6 font-semibold text-center w-28">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 text-sm">
                                                {isFetching ? (
                                                    <tr>
                                                        <td className="text-center py-12" colSpan={5}>
                                                            <p className="text-gray-500 text-md">Mohon Tunggu...</p>
                                                        </td>
                                                    </tr>
                                                ) : barang && barang.length > 0 ? barang.map((item, index) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                                        <td className="py-4 px-6 font-medium text-gray-900">{item.name}</td>
                                                        <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.kategori === 'kebersihan'
                                                                ? 'bg-brand-light text-brand-dark'
                                                                : 'bg-gray-100 text-gray-700'
                                                                }`}>
                                                                {item.kategori}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-gray-500">{formatDMY(item.created_at)}</td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex justify-center gap-3">
                                                                <Link to={`/portal-akses-admin-web-sarpras-afm/barang/stok/${item.id}`}
                                                                    className="text-gray-400 hover:text-brand-primary transition-colors"
                                                                    title="Detail Stok Barang"
                                                                >
                                                                    <Eye size={18} />
                                                                </Link>
                                                                <button onClick={() => setEditModal(item)}
                                                                    className="text-gray-400 hover:text-brand-primary transition-colors"
                                                                    title="Edit Barang"
                                                                >
                                                                    <Edit size={18} />
                                                                </button>
                                                                <button onClick={() => setHapusModal(item.id)}
                                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                                    title="Hapus Barang"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center py-12" colSpan={5}>
                                                            <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                                            <p className="text-gray-500 text-sm">Belum ada barang yang ditambahkan.</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            </div>
                        )}

                        <TambahBarangAdminModal isOpen={tambahModal} onClose={() => setTambahModal(false)} />

                        {editModal && (
                            <EditBarangAdminModal data={editModal} onClose={() => setEditModal(null)} />
                        )}

                        {hapusModal && (
                            <HapusModalTemplate judul="Barang" id={hapusModal} onClose={() => setHapusModal(null)} />
                        )}
                    </main>
                </div>
            )}
        </>
    )
}