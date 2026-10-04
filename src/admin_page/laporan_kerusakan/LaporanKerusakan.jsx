import {
    AlertTriangle,
    Wrench,
    Trash2,
    Filter,
    Bot,
    Eye,
    CheckCircle2Icon
} from 'lucide-react';
import NavbarAdmin from '../../component/navbar/NavbarAdmin';
import GetAllLaporanKerusakanLogic from '../../logic/admin_logic/laporan_kerusakan/GetAllLaporanKerusakan';
import { useState } from 'react';
import Loading from '../../loading/Loading';
import ErrorComponents from '../../component/error_components/ErrorComponents';
import { formatDMY } from '../../component/date_format/DateFormat';
import { Link } from 'react-router-dom';
import TandaiDiperbaikiLaporanKerusakanModal from '../../component/modal/laporan_kerusakan/TandaiDiperbaikiLaporanKerusakan';
import TandaiSelesaiLaporanKerusakanModal from '../../component/modal/laporan_kerusakan/TandaiSelesaiLaporanKerusakan';
import HapusLaporanKerusakanModal from '../../component/modal/laporan_kerusakan/HapusLaporanKerusakan';

export default function LaporanKerusakan() {
    const [filterStatus, setFilterStatus] = useState(null);
    const { data, isLoading, isError, error, isFetching } = GetAllLaporanKerusakanLogic(filterStatus);
    const laporan_kerusakan = data?.data;
    const [editDiperbaikiModal, setEditDiperbaikiModal] = useState(null);
    const [editSelesaiModal, setEditSelesaiModal] = useState(null);
    const [hapusModal, setHapusModal] = useState(null);

    const getUrgencyBadge = (urgency) => {
        switch (urgency) {
            case 'low': return 'bg-blue-50 text-blue-700';
            case 'medium': return 'bg-yellow-50 text-yellow-700';
            case 'high': return 'bg-orange-50 text-orange-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'open': return 'bg-gray-100 text-gray-600 border border-gray-200';
            case 'in_proggress': return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
            case 'done': return 'bg-green-50 text-green-700 border border-green-200';
            default: return 'bg-gray-50 text-gray-700 border border-gray-200';
        }
    };

    const formatStatusText = (status) => {
        if (status === 'open') return 'Menunggu';
        if (status === 'in_proggress') return 'Diproses';
        if (status === 'done') return 'Selesai';
        return status;
    };

    const handleFilterChange = (e) => {
        const val = e.target.value;

        setFilterStatus(val === "" ? null : val)
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
                                <h1 className="text-3xl font-bold text-brand-dark">Laporan Kerusakan</h1>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter size={16} className="text-gray-400" />
                                    </div>
                                    <select value={filterStatus || ''} onChange={handleFilterChange} className="block w-full sm:w-auto pl-10 pr-8 py-2.5 text-sm border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary border outline-none bg-white appearance-none cursor-pointer shadow-sm">
                                        <option value="">Semua Status</option>
                                        <option value="open">Menunggu (Open)</option>
                                        <option value="in_proggress">Diproses</option>
                                        <option value="done">Selesai</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {isError ? (
                            <ErrorComponents error={error} judul="Laporan Kerusakan" />
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                                <th className="py-4 px-6 font-semibold w-16">No</th>
                                                <th className="py-4 px-6 font-semibold">Pelapor</th>
                                                <th className="py-4 px-6 font-semibold min-w-50">Keluhan</th>
                                                <th className="py-4 px-6 font-semibold">Kode Barang</th>
                                                <th className="py-4 px-6 font-semibold">Urgensi</th>
                                                <th className="py-4 px-6 font-semibold min-w-50">Saran (AI)</th>
                                                <th className="py-4 px-6 font-semibold">Status</th>
                                                <th className="py-4 px-6 font-semibold">Waktu Lapor</th>
                                                <th className="py-4 px-6 font-semibold">Waktu Selesai</th>
                                                <th className="py-4 px-6 font-semibold text-center w-28">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-sm">
                                            {isFetching ? (
                                                <tr>
                                                    <td className="text-center py-12" colSpan={10}>
                                                        <p className="text-gray-500 text-md">Mohon Tunggu...</p>
                                                    </td>
                                                </tr>
                                            ) : laporan_kerusakan && laporan_kerusakan.length > 0 ? laporan_kerusakan.map((item, index) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                                    <td className="py-4 px-6 font-medium text-gray-900">{item.nama_pelapor}</td>

                                                    <td className="py-4 px-6">
                                                        <p className="text-gray-700 max-w-xs truncate" title={item.raw_complaint}>
                                                            {item.raw_complaint}
                                                        </p>
                                                    </td>

                                                    <td className="py-4 px-6 font-medium text-brand-dark">{item.item_stocks?.kode_label}</td>

                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getUrgencyBadge(item.urgensi)}`}>
                                                            {item.ai_urgency}
                                                        </span>
                                                    </td>

                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-1.5 text-gray-600 max-w-xs">
                                                            <Bot size={14} className="text-brand-secondary shrink-0" />
                                                            <span className="truncate" title={item.ai_recomendation}>{item.ai_recomendation}</span>
                                                        </div>
                                                    </td>

                                                    <td className="py-4 px-6">
                                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status)}`}>
                                                            {formatStatusText(item.status)}
                                                        </span>
                                                    </td>

                                                    <td className="py-4 px-6 text-gray-500">{item.created_at ? formatDMY(item.created_at) : '-'}</td>
                                                    <td className="py-4 px-6 text-gray-500">{item.resolved_at ? formatDMY(item.resolved_at) : "-"}</td>

                                                    <td className="py-4 px-6">
                                                        <div className="flex justify-center gap-3">
                                                            <Link
                                                                to={`/portal-akses-admin-web-sarpras-afm/laporan-kerusakan/detail/${item.id}`}
                                                                className="text-gray-400 hover:text-brand-primary transition-colors"
                                                                title="Detail Laporan"
                                                            >
                                                                <Eye size={18} />
                                                            </Link>
                                                            {item.status === "open" && (
                                                                <button
                                                                    onClick={() => setEditDiperbaikiModal(item)}
                                                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                                                    title="Tandai Sedang Diperbaiki"
                                                                >
                                                                    <Wrench size={18} />
                                                                </button>
                                                            )}
                                                            {item.status === "in_proggress" && (
                                                                <button
                                                                    onClick={() => setEditSelesaiModal(item)}
                                                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                                                    title="Tandai Selesai Diperbaiki"
                                                                >
                                                                    <CheckCircle2Icon size={18} />
                                                                </button>
                                                            )}
                                                            {item.status === "done" && (
                                                                <button
                                                                    onClick={() => setHapusModal(item.id)}
                                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                                    title="Hapus Laporan"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td className="text-center py-12" colSpan={10}>
                                                        <AlertTriangle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                                        <p className="text-gray-500 text-sm">Belum ada laporan kerusakan.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {editDiperbaikiModal && (
                                    <TandaiDiperbaikiLaporanKerusakanModal data={editDiperbaikiModal} onClose={() => setEditDiperbaikiModal(null)} />
                                )}

                                {editSelesaiModal && (
                                    <TandaiSelesaiLaporanKerusakanModal data={editSelesaiModal} onClose={() => setEditSelesaiModal(null)} />
                                )}

                                {hapusModal && (
                                    <HapusLaporanKerusakanModal id={hapusModal} onClose={() => setHapusModal(null)} />
                                )}
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    )
}