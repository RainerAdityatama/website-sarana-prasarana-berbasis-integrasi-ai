import { Link } from "react-router-dom"

export default function Halaman404() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
            <div className="text-center">
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-primary sm:text-6xl">
                    404 Not Found
                </h1>

                <p className="mt-6 text-base leading-7 text-brand-dark max-w-lg mx-auto">
                    Maaf, kami tidak dapat menemukan halaman yang Anda cari. Silahkan kembali ke beranda
                </p>

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-lg bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primartext-brand-primary/20 hover:bg-brand-dark transition-all active:scale-95 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-primartext-brand-primary"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </main>
    )
}