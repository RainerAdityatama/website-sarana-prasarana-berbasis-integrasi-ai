import HapusStokBarangLogic from "../../../../logic/admin_logic/stok_barang/HapusStokBarang"

export default function HapusPermanenBarangModal({ id, onClose }) {
    const { mutate, isPending } = HapusStokBarangLogic();

    const handleDelete = (e) => {
        e.preventDefault();

        mutate(id, {
            onSuccess: () => {
                onClose();
            }
        })
    }

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl border border-[#E8E2DB] overflow-hidden">
                <div className="p-8 text-center">
                    <h3 className="text-xl font-bold text-[#3B2B26] mb-2">Hapus Permanen Barang?</h3>
                    <p className="text-[#8C7A70] text-sm leading-relaxed">
                        Apakah Anda yakin ingin menghapus permanen stok barang ini?
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
                        className="flex-1 px-6 py-3.5 bg-red-500 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-[#C97060]/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Menghapus..." : "Ya, Hapus Permanen"}
                    </button>
                </div>
            </div>
        </div>
    )
}