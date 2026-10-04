import { useState } from "react";
import EditSelesaiLaporanKerusakanLogic from "../../../logic/admin_logic/laporan_kerusakan/EditSelesaiLaporanKerusakan";

export default function TandaiSelesaiLaporanKerusakanModal({ data, onClose }) {
    const { mutate, isPending } = EditSelesaiLaporanKerusakanLogic();
    const [formData, setFormData] = useState({
        id_laporan: data.id,
        stok_id: data.stok_id
    });

    const handleEdit = (e) => {
        e.preventDefault();

        mutate(formData, {
            onSuccess: () => {
                setFormData({
                    id_laporan: "",
                    stok_id: ""
                })
                onClose();
            }
        })
    }

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
            <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl border border-[#E8E2DB] overflow-hidden">
                <div className="p-8 text-center">
                    <h3 className="text-xl font-bold text-[#3B2B26] mb-2">Tandai Selesai Diperbaiki Pada Laporan ini?</h3>
                    <p className="text-[#8C7A70] text-sm leading-relaxed">
                        Apakah Anda yakin ingin menandai selesai diperbaiki stok barang pada laporan ini?
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
                        onClick={handleEdit}
                        disabled={isPending}
                        className="flex-1 px-6 py-3.5 bg-red-500 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-[#C97060]/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Menghapus..." : "Ya, Tandai Selesai Diperbaiki"}
                    </button>
                </div>
            </div>
        </div>
    )
}