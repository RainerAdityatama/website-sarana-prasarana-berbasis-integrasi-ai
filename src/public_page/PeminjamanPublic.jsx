import { useState } from "react";
import NavbarPublic from "../component/navbar/NavbarPublic"
import GetStokForTambahPeminjamanLogic from "../logic/admin_logic/stok_barang/GetStokForTambahPeminjaman"
import Loading from "../loading/Loading";
import TambahPeminjamanPublicLogic from "../logic/public_logic/peminjaman/TambahPeminjamanPublic";
import { Link } from "react-router-dom";

export default function HalamanPeminjamanPublic() {
    const { data, error, isError, isLoading, isFetching } = GetStokForTambahPeminjamanLogic();
    const { data: dataPeminjaman, mutate, isPending } = TambahPeminjamanPublicLogic();

    const [formData, setFormData] = useState({
        nama_peminjam: '',
        stok_id: '',
        lokasi: ''
    });

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
            }
        });
    }

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
                    <NavbarPublic />

                    <div className="grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-2">
                        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-5 text-center">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-primary text-brand-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-all">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                                </svg>
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <h1 className="text-2xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-2 sm:mb-3">
                                    Form Peminjaman Barang
                                </h1>
                            </div>

                            <form className="space-y-5 text-left" onSubmit={handleSubmit}>
                                <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                                    <div className="w-full">
                                        <label htmlFor="nama_peminjam" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Nama Lengkap Peminjam <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="nama_peminjam"
                                            name="nama_peminjam"
                                            value={formData.nama_peminjam}
                                            onChange={handleChange}
                                            required
                                            placeholder="Masukkan nama lengkap Anda"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-gray-800 placeholder-gray-400"
                                        />
                                    </div>

                                    <div className="w-full">
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
                                            {isFetching ? (
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
                                </div>

                                <div>
                                    <label htmlFor="lokasi" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Lokasi Penggunaan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lokasi"
                                        name="lokasi"
                                        value={formData.lokasi}
                                        onChange={handleChange}
                                        required
                                        placeholder="Contoh: Lorong 2T Putra"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-gray-800 placeholder-gray-400"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-brand-primary hover:bg-brand-dark rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                                    >
                                        {isPending ? "Memproses data..." : "Ajukan Peminjaman"}
                                    </button>
                                </div>
                            </form>

                            {dataPeminjaman && (
                                <div className="text-center mb-1 mt-4">
                                    <Link to={`/peminjaman/${dataPeminjaman.id}`} className="text-gray-500 underline">Silahkan kunjungi tautan berikut ini untuk mengembalikan barang</Link>
                                    <p className="text-red-600">Note: Jangan lupa untuk menyimpan tautan ini agar bisa mengembalikan peminjaman!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}