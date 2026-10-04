import { Link, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    Box,
    CheckCircle2,
    AlertCircle,
    XCircle,
    OctagonAlert,
    Wrench,
    CheckCircle2Icon
} from 'lucide-react';
import NavbarAdmin from '../../component/navbar/NavbarAdmin';
import DetailBarangLogic from '../../logic/admin_logic/barang/GetDetailBarang';
import GetDetailStokBarang from '../../logic/admin_logic/stok_barang/GetDetailStokBarang';
import Loading from '../../loading/Loading';
import ErrorComponents from '../../component/error_components/ErrorComponents';
import { formatDMY } from '../../component/date_format/DateFormat';
import TambahStokModal from '../../component/modal/stok_barang/tambah/TambahStok';
import { useState } from 'react';
import EditStokModal from '../../component/modal/stok_barang/edit/EditStok';
import HapusModalStokBarang from '../../component/modal/hapus_modal/HapusModalStokBarang';
import TandaiRusakModal from '../../component/modal/stok_barang/edit/TandaiRusak';
import TandaiDiperbaikiModal from '../../component/modal/stok_barang/edit/TandaiDiperbaiki';
import TandaiTersediaModal from '../../component/modal/stok_barang/edit/TandaiTersedia';

export default function StokItemsPage() {
    const { id } = useParams();

    const { data, isLoading, isError, error } = DetailBarangLogic(id);
    const { data: dataStok, isLoading: isLoadingStok, isError: isErrorStok, error: errorStok, isFetching } = GetDetailStokBarang(id);

    const [tambahModal, setTambahModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [hapusModal, setHapusModal] = useState(null);
    const [editTandaiRusakModal, setEditTandaiRusakModal] = useState(null);
    const [editDiperbaikiModal, setEditDiperbaikiModal] = useState(null);
    const [editTersediaModal, setEditTersediaModal] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'tersedia':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 size={14} /> Tersedia
                    </span>
                );
            case 'dipinjam':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <ArrowLeft size={14} className="rotate-45" /> Dipinjam
                    </span>
                );
            case 'rusak':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        <XCircle size={14} /> Rusak
                    </span>
                );
            case 'sedang_diperbaiki':
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                        <AlertCircle size={14} /> Sedang Diperbaiki
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {isLoading || isLoadingStok ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
                    <NavbarAdmin />

                    {isError ? (
                        <ErrorComponents error={error} judul="Barang" />
                    ) : isErrorStok ? (
                        <ErrorComponents error={errorStok} judul="Stok" />
                    ) : (
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className="mb-6">
                                <Link
                                    to="/portal-akses-admin-web-sarpras-afm/barang"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors"
                                >
                                    <ArrowLeft size={16} />
                                    Kembali ke Master Barang
                                </Link>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                                        <Box className="text-brand-primary" size={24} />
                                        Detail Stok: <span className='underline'>{data.name}</span>
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Kelola status fisik untuk barang ini.
                                    </p>
                                </div>

                                <button onClick={() => setTambahModal(data)} className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-dark transition-colors shadow-sm">
                                    <Plus size={18} />
                                    Tambah Stok Fisik
                                </button>
                            </div>


                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                                <th className="py-4 px-6 font-semibold w-16">No</th>
                                                <th className="py-4 px-6 font-semibold">Nama Induk</th>
                                                <th className="py-4 px-6 font-semibold">Kode Label</th>
                                                <th className="py-4 px-6 font-semibold">Status Fisik</th>
                                                <th className="py-4 px-6 font-semibold">Dibuat Pada</th>
                                                <th className="py-4 px-6 font-semibold text-center w-28">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm">
                                            {isFetching ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-12">
                                                        <p className="text-gray-500 text-sm">Mohon Tunggu...</p>
                                                    </td>
                                                </tr>
                                            ) : dataStok && dataStok.length > 0 ? dataStok.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                                    <td className="py-4 px-6 font-medium text-gray-900">{item.items?.name}</td>
                                                    <td className="py-4 px-6">
                                                        <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-mono text-xs tracking-wider border border-gray-200">
                                                            {item.kode_label}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        {getStatusBadge(item.status)}
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500">{formatDMY(item.created_at)}</td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex justify-center gap-3">
                                                            <button
                                                                onClick={() => setEditModal(item)}
                                                                className="text-gray-400 hover:text-brand-primary transition-colors"
                                                                title="Edit Label"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            {item.status !== 'dipinjam' && (
                                                                <button
                                                                    onClick={() => setHapusModal(item.id)}
                                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                                    title="Hapus Stok Fisik"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                            {item.status === 'tersedia' ? (
                                                                <button
                                                                    onClick={() => setEditTandaiRusakModal(item.id)}
                                                                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                                                                    title="Tandai Rusak"
                                                                >
                                                                    <OctagonAlert size={18} />
                                                                </button>
                                                            ) : item.status === 'rusak' ? (
                                                                <button
                                                                    onClick={() => setEditDiperbaikiModal(item.id)}
                                                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                                                    title="Tandai Sedang Diperbaiki"
                                                                >
                                                                    <Wrench size={18} />
                                                                </button>
                                                            ) : item.status === 'sedang_diperbaiki' && (
                                                                <button
                                                                    onClick={() => setEditTersediaModal(item.id)}
                                                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                                                    title="Tandai Selesai Diperbaiki"
                                                                >
                                                                    <CheckCircle2Icon size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-12">
                                                        <Box className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                                        <p className="text-gray-500 text-sm">Belum ada stok fisik yang ditambahkan untuk barang ini.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {tambahModal && (
                                <TambahStokModal data={tambahModal} onClose={() => setTambahModal(null)} />
                            )}

                            {editModal && (
                                <EditStokModal data={editModal} onClose={() => setEditModal(null)} />
                            )}

                            {hapusModal && (
                                <HapusModalStokBarang id={hapusModal} onClose={() => setHapusModal(null)} />
                            )}

                            {editTandaiRusakModal && (
                                <TandaiRusakModal id={editTandaiRusakModal} onClose={() => setEditTandaiRusakModal(null)} />
                            )}

                            {editDiperbaikiModal && (
                                <TandaiDiperbaikiModal id={editDiperbaikiModal} onClose={() => setEditDiperbaikiModal(null)} />
                            )}

                            {editTersediaModal && (
                                <TandaiTersediaModal id={editTersediaModal} onClose={() => setEditTersediaModal(null)} />
                            )}
                        </main>
                    )}
                </div>
            )}
        </>
    );
}