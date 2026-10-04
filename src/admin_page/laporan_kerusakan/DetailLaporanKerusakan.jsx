import { Link, useParams } from "react-router-dom"
import NavbarAdmin from "../../component/navbar/NavbarAdmin";
import GetDetailLaporanKerusakanLogic from "../../logic/admin_logic/laporan_kerusakan/GetDetailLaporanKerusakan";
import Loading from "../../loading/Loading";
import ErrorComponents from "../../component/error_components/ErrorComponents";
import { formatDMY } from "../../component/date_format/DateFormat";

export default function DetailLaporanKerusakan() {
    const { id_laporan } = useParams();

    const { data, isLoading, isError, error } = GetDetailLaporanKerusakanLogic(id_laporan)

    const getUrgencyBadge = (urgency) => {
        const styles = {
            low: "bg-green-100 text-green-700 border-green-200",
            medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
            high: "bg-red-100 text-red-700 border-red-200",
        };
        return styles[urgency] || "bg-gray-100 text-gray-700";
    };

    const getStatusBadge = (status) => {
        const styles = {
            open: "bg-blue-100 text-blue-700",
            in_proggress: "bg-orange-100 text-orange-700",
            done: "bg-emerald-100 text-emerald-700",
        };
        const labels = {
            open: "Terbuka (Menunggu)",
            in_proggress: "Sedang Diproses",
            done: "Selesai",
        };
        return { style: styles[status], label: labels[status] };
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
                    <NavbarAdmin />

                    {isError ? (
                        <ErrorComponents error={error} judul="Detail Laporan Kerusakan" />
                    ) : (
                        <>
                            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                                    <Link to={`/portal-akses-admin-web-sarpras-afm/laporan-kerusakan`}
                                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors"
                                        aria-label="Kembali ke daftar laporan"
                                    >
                                        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Kembali
                                    </Link>

                                    <div className="text-sm font-semibold text-gray-900">
                                        ID Laporan : {data.id}
                                    </div>
                                </div>
                            </header>

                            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h1 className="text-3xl font-extrabold text-gray-900">
                                                {data.item_stocks?.kode_label}
                                            </h1>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getUrgencyBadge(data.ai_urgency)}`}>
                                                {data.ai_urgency} URGENCY
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(data.status).style}`}>
                                                {getStatusBadge(data.status).label}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                                            <span>Dilaporkan: {formatDMY(data.created_at)}</span>
                                            {data.resolved_at && (
                                                <span>Diselesaikan: {formatDMY(data.resolved_at)}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                                    <div className="lg:col-span-2 space-y-6">
                                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-brand-primary/20 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-light/30 rounded-bl-full z-0"></div>
                                            <div className="relative z-10">
                                                <h2 className="text-sm font-bold text-brand-primary uppercase tracking-wider mb-3 flex items-center">
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    Rekomendasi Tindakan AI
                                                </h2>
                                                <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                                                    {data.ai_recomendation}
                                                </p>
                                            </div>
                                        </section>

                                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                                Laporan Keluhan Asli
                                            </h2>
                                            <blockquote className="bg-gray-50 border-l-4 border-gray-300 p-4 sm:p-5 rounded-r-xl text-gray-700 text-base leading-relaxed italic">
                                                "{data.raw_complaint}"
                                            </blockquote>
                                        </section>

                                    </div>

                                    <div className="space-y-6">
                                        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                            <h2 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                                                Informasi Aset
                                            </h2>

                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium mb-1">KODE LABEL BARANG</p>
                                                    <p className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-md inline-block">
                                                        {data.item_stocks?.kode_label}
                                                    </p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </main>
                        </>
                    )}
                </div>
            )}
        </>
    );
}