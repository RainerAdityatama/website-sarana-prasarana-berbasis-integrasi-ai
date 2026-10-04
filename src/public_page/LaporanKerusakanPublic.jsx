import { useState } from "react"
import NavbarPublic from "../component/navbar/NavbarPublic"
import TambahLaporanKerusakanPublicLogic from "../logic/public_logic/laporan_kerusakan/TambahLaporanKerusakanPublic";
import toast from "react-hot-toast";

export default function HalamanLaporanKerusakanPublic() {
    const [formData, setFormData] = useState({
        nama_pelapor: '',
        raw_complaint: '',
    });

    const { mutate, isPending } = TambahLaporanKerusakanPublicLogic()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nama_pelapor.trim() || !formData.raw_complaint.trim()) {
            toast.error("Nama dan detail kerusakan wajib diisi!");
            return;
        }

        if (formData.raw_complaint > 1000) {
            toast.error("Teks laporan terlalu panjang. Maksimal 1000 karakter.");
            return;
        }

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    nama_pelapor: '',
                    raw_complaint: '',
                })
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
            <NavbarPublic />

            <div className="grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-primary text-brand-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-all">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Form laporan kerusakan
                        </h1>

                        <div className="p-4 sm:p-5 bg-blue-50 border border-blue-100 rounded-xl text-left flex items-start">
                            <svg className="w-5 h-5 text-brand-primary mt-0.5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                <span className="font-semibold text-gray-900">Catatan: </span>
                                Pastikan mencantumkan data yang lengkap seperti nomor barang dan jelaskan kerusakan dengan jelas dan mudah dipahami.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        <div>
                            <label htmlFor="nama_pelapor" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Nama Pelapor <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="nama_pelapor"
                                name="nama_pelapor"
                                value={formData.nama_pelapor}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan nama lengkap Anda"
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        <div>
                            <label htmlFor="raw_complaint" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Detail Kerusakan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="raw_complaint"
                                name="raw_complaint"
                                value={formData.raw_complaint}
                                onChange={handleChange}
                                rows="6"
                                required
                                placeholder="Contoh: Proyektor Epson nomor PRJ-001 lampunya mati dan mengeluarkan suara dengung saat dinyalakan..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all text-gray-800 placeholder-gray-400 resize-y"
                            ></textarea>
                        </div>

                        <div className="pt-3">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-brand-primary hover:bg-brand-dark rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                            >
                                {isPending ? "Sedang memproses..." : "Kirim Laporan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}