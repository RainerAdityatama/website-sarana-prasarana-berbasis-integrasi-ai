import HapusStokBarangLogic from "../../../logic/admin_logic/stok_barang/HapusStokBarang";

export default function HapusModalStokBarang({ id, onClose }) {
    const { mutate, isPending } = HapusStokBarangLogic();

    const handleDelete = (e) => {
        e.preventDefault();

        mutate(id, {
            onSuccess: () => {
                onClose();
            }
        });
    }

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl border border-[#E8E2DB] overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#5B7C16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                        </svg>
                    </div>

                    <h3 className="text-xl font-bold text-[#3B2B26] mb-2">Hapus Stok Barang?</h3>
                    <p className="text-[#8C7A70] text-sm leading-relaxed">
                        Apakah Anda yakin ingin menghapus data ini?
                    </p>
                </div>

                <div className="flex items-center gap-3 p-6 bg-gray-100 border-t border-[#E8E2DB]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-3.5 text-sm font-bold text-[#8C7A70] hover:text-[#3B2B26] transition-all"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 px-6 py-3.5 bg-brand-primary hover:bg-brand-dark text-white rounded-2xl font-bold shadow-lg shadow-[#C97060]/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    )
}