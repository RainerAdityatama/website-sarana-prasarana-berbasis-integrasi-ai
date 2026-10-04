import { ArrowLeft, Package } from "lucide-react"
import ErrorComponents from "../../component/error_components/ErrorComponents"
import NavbarAdmin from "../../component/navbar/NavbarAdmin"
import Loading from "../../loading/Loading"
import GetStokHilangLogic from "../../logic/admin_logic/stok_barang/GetStokHilang"
import { Link } from "react-router-dom"
import { useState } from "react"
import PulihkanStokBarangModal from "../../component/modal/stok_barang/edit/PulihkanStokBarang"
import HapusPermanenBarangModal from "../../component/modal/stok_barang/edit/HapusPermanenBarang"

export default function HalamanStokHilangItems() {
    const { data, error, isError, isLoading, isFetching } = GetStokHilangLogic();
    const [pulihkanStokModal, setPulihkanStokModal] = useState(null);
    const [hapusPermanenModal, setHapusPermanenModal] = useState(null);

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
                                <h1 className="text-3xl font-bold text-brand-dark">List Stok Barang Hilang</h1>
                                <div className="mt-3">
                                    <Link
                                        to="/portal-akses-admin-web-sarpras-afm/barang"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors"
                                    >
                                        <ArrowLeft size={16} />
                                        Kembali ke Master Barang
                                    </Link>
                                </div>
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
                                                    <th className="py-4 px-6 font-semibold">Kode Label</th>
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
                                                ) : data && data.length > 0 ? data.map((item, index) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="py-4 px-6 text-gray-500">{index + 1}</td>
                                                        <td className="py-4 px-6 font-medium text-gray-900">{item.items?.name}</td>
                                                        <td className="py-4 px-6 font-medium text-gray-900">{item.kode_label}</td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex justify-center gap-3">
                                                                <button onClick={() => setPulihkanStokModal(item.id)} className='text-white bg-brand-primary px-2 py-2 rounded-xl font-medium cursor-pointer'>
                                                                    Pulihkan
                                                                </button>
                                                                <button onClick={() => setHapusPermanenModal(item.id)} className='text-white bg-red-600 px-2 py-2 rounded-xl font-medium cursor-pointer'>
                                                                    Hapus Permanen
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td className="text-center py-12" colSpan={4}>
                                                            <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                                            <p className="text-gray-500 text-sm">Tidak ada stok barang yang hilang.</p>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {pulihkanStokModal && (
                                        <PulihkanStokBarangModal id={pulihkanStokModal} onClose={() => setPulihkanStokModal(null)} />
                                    )}

                                    {hapusPermanenModal && (
                                        <HapusPermanenBarangModal id={hapusPermanenModal} onClose={() => setHapusPermanenModal(null)} />
                                    )}
                                </>
                            </div>
                        )}
                    </main>
                </div>
            )}
        </>
    )
}