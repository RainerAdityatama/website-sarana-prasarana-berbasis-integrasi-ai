import { Link } from 'react-router-dom';
import {
    AlertTriangle,
    ArrowRight,
    ClipboardList,
    Wrench
} from 'lucide-react';
import NavbarPublic from '../component/navbar/NavbarPublic';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <NavbarPublic />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <header className="mb-10 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-3">
                        Sistem Sarana & Prasarana PPM AFM
                    </h1>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Kelola peminjaman barang dan laporkan kerusakan fasilitas asrama dengan mudah, cepat, dan terstruktur.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ClipboardList className="text-brand-primary" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark mb-2">Pinjam Barang</h2>
                        <p className="text-gray-600 mb-6 line-clamp-2">
                            Butuh sapu, pengki, atau alat kebersihan lainnya? Catat peminjaman di sini.
                        </p>
                        <Link to="/peminjaman" className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-dark transition-colors w-full sm:w-auto justify-center">
                            Mulai Pinjam <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Wrench className="text-orange-500" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark mb-2">Lapor Kerusakan</h2>
                        <p className="text-gray-600 mb-6 line-clamp-2">
                            Temukan barang atau fasilitas asrama yang rusak? Laporkan ke divisi Sarpras.
                        </p>
                        <Link to="/laporan-kerusakan" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto justify-center">
                            Buat Laporan <AlertTriangle size={18} className="text-orange-500" />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}