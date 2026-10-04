export default function ErrorComponents({ error, judul }) {
    return (
        <section className="w-full py-16 px-4 flex justify-center items-center min-h-100">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-red-800 mb-1">Gagal Memuat {judul}</h3>
                <p className="text-sm text-red-600">{error.message || "Terjadi kesalahan pada sistem. Silakan coba lagi nanti."}</p>
            </div>
        </section>
    )
}