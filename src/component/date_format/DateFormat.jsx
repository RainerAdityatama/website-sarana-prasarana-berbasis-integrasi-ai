export const formatDMY = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '-';

    // 3. Ambil komponen tanggal dan pastikan format 2 digit (padStart)
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const y = date.getFullYear();

    return `${d}-${m}-${y}`;
};
