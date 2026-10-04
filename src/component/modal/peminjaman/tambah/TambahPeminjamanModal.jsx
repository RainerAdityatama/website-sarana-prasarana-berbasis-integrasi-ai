import { X, Save, ClipboardList } from 'lucide-react';
import { useState } from 'react';
import TambahPeminjamanLogic from '../../../../logic/admin_logic/peminjaman/TambahPeminjaman';

export default function TambahPeminjamanModal({ isOpen, data, isError, error, isFetchingStok, onClose }) {
    const [formData, setFormData] = useState({
        nama_peminjam: '',
        stok_id: '',
        lokasi: '',
    });

    const { mutate, isPending } = TambahPeminjamanLogic();

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    nama_peminjam: '',
                    stok_id: '',
                    lokasi: '',
                });
                onClose();
            }
        });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-brand-dark">
                        <ClipboardList size={20} />
                        <h2 className="text-lg font-bold">Tambah Peminjaman Baru</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"
                        title="Tutup Modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-5">
                        <div>
                            <label htmlFor="nama_peminjam" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Nama Peminjam <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama_peminjam"
                                name="nama_peminjam"
                                required
                                value={formData.nama_peminjam}
                                onChange={handleChange}
                                placeholder="Cth: Muhammad Saepul"
                                className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="stok_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Pilih Stok Barang <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="stok_id"
                                name="stok_id"
                                required
                                value={formData.stok_id}
                                onChange={handleChange}
                                className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none bg-white cursor-pointer shadow-sm transition-all"
                            >
                                <option value="" disabled>Pilih Stok Barang...</option>
                                {isFetchingStok ? (
                                    <option>Mohon Tunggu...</option>
                                ) : data && data.length > 0 ? (
                                    data.map((item) => (
                                        <option value={item.id}>{item.items?.name} - {item.kode_label}</option>
                                    ))
                                ) : isError && (
                                    <option className='bg-red-500 text-white'>{error.message}</option>
                                )}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Lokasi Peminjam <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="lokasi"
                                name="lokasi"
                                required
                                value={formData.lokasi}
                                onChange={handleChange}
                                placeholder="Cth: MF 1"
                                className="block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary border border-transparent rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors shadow-sm"
                        >
                            <Save size={16} />
                            {isPending ? "Memproses..." : "Simpan Peminjaman"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}