# 🏫 SARPRAS PPM AFM - AI-Integrated Asset & Facility Management

Aplikasi Single Page Application (SPA) modern untuk sistem manajemen sarana, prasarana, dan peminjaman barang di lingkungan asrama (PPM). Sistem ini dirancang dengan fokus pada efisiensi operasional, pelacakan aset real-time, dan inovasi integrasi **Google Gemini AI** via Supabase Edge Functions untuk validasi otomatis laporan kerusakan.

Dibangun dengan arsitektur yang memisahkan *Server State* (sinkronisasi API & caching) dan *Client State* (UI/interaksi pengguna) guna menghasilkan performa yang cepat, *maintainable*, dan tangguh (*resilient*) terhadap kegagalan jaringan.

## 🚀 Teknologi yang Digunakan

**Core & State Management:**
*   **React (Vite):** Framework utama dengan build tool Vite untuk *Hot Module Replacement (HMR)* yang super cepat dan optimasi *build* produksi.
*   **TanStack Query (React Query):** Digunakan sebagai *Server State Management* untuk *data fetching*, *caching*, sinkronisasi, dan optimasi *request* ke Supabase.

**Styling & UI Components:**
*   **Tailwind CSS:** *Utility-first CSS framework* untuk *styling* yang responsif dan konsisten.
*   **Lucide React:** Koleksi ikon SVG modern, konsisten, dan ringan.
*   **React Hot Toast:** Sistem notifikasi interaktif untuk memberikan *feedback* visual instan kepada pengguna dengan *dynamic error unwrapping*.

**Backend & Integrasi AI (BaaS):**
*   **Supabase:** Mengelola database PostgreSQL, autentikasi, dan *Row Level Security* (RLS).
*   **Supabase Edge Functions (Deno):** Menjalankan *serverless backend logic* dengan *Exponential Backoff Retry* untuk menahan lonjakan *traffic* AI.
*   **Google Gemini AI:** Ekstraksi data *natural language* dan rekomendasi teknis menggunakan model *Flash* yang dioptimalkan untuk respons berlatensi rendah.

## ✨ Fitur Utama

Aplikasi ini dibagi menjadi dua antarmuka utama berdasarkan *Role-Based Access Control*:

### 👤 Halaman Publik (Pengguna / Santri)
*   **Katalog Peminjaman Publik:** Menampilkan daftar barang yang tersedia untuk dipinjam secara *real-time*.
*   **Laporan Kerusakan Terintegrasi AI:** Form pelaporan cerdas di mana keluhan pengguna dianalisis secara otomatis oleh AI untuk mengekstrak kode barang, menentukan tingkat urgensi (*Low/Medium/High*), dan memberikan rekomendasi teknis awal. Sistem dilengkapi proteksi *Zero-Trust Input* untuk mencegah *Token Drain* dan *Prompt Injection*.

### 🛡️ Dashboard Admin
*   **Manajemen Master Barang (CRUD):** Antarmuka terpusat untuk mendata entitas barang utama.
*   **Manajemen Stok Dinamis:** Pelacakan unit fisik secara individual dengan kontrol status (*Tersedia, Dipinjam, Rusak, Sedang Diperbaiki*).
*   **Manajemen Peminjaman:** Sistem sirkulasi aset dengan fungsi *checkout* dan pembaruan status pengembalian (dikembalikan secara normal atau ditandai *hilang*).
*   **Resolusi Laporan Kerusakan:** Panel untuk meninjau hasil ekstraksi AI dan mengeksekusi tindakan perbaikan fisik berdasarkan laporan publik.

## 📸 Tangkapan Layar (Screenshots)

*(Catatan: Gambar antarmuka aplikasi akan segera diperbarui)*
*   **Halaman Peminjaman Publik** - `[Placeholder: public-borrow.png]`
*   **Form Laporan Kerusakan Publik (AI Powered)** - `[Placeholder: public-report.png]`
*   **Dashboard Admin - Manajemen Barang** - `[Placeholder: admin-master-item.png]`
*   **Dashboard Admin - Manajemen Stok Barang** - `[Placeholder: admin-stock.png]`
*   **Dashboard Admin - Manajemen Peminjaman** - `[Placeholder: admin-circulation.png]`
*   **Dashboard Admin - Laporan Kerusakan & Analisis AI** - `[Placeholder: admin-reports.png]`

## 🛠️ Cara Instalasi & Menjalankan (Lokal)

### 1. Kloning Repositori
```bash
git clone [https://github.com/RainerAdityatama/website-sarana-prasarana-berbasis-integrasi-ai.git](https://github.com/RainerAdityatama/website-sarana-prasarana-berbasis-integrasi-ai.git)
cd website-sarana-prasarana-berbasis-integrasi-ai

```

### 2. Instalasi Dependensi Frontend

Pastikan Anda telah menginstal Node.js (versi 18+ direkomendasikan).

```bash
npm install

```

### 3. Konfigurasi Environment Variables (Frontend)

Buat file `.env` di *root directory* proyek dan masukkan kredensial Supabase Anda. Kunci ini aman terekspos di frontend berkat pengamanan *Row Level Security* (RLS) di sisi database.

```env
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-anon-key-here

```

### 4. Konfigurasi Edge Functions & Supabase Secrets (Backend)

Untuk menjalankan integrasi AI secara aman, kredensial harus disimpan di level *Serverless*. Gunakan Supabase CLI:

```bash
supabase secrets set GEMINI_API_KEY="your-google-gemini-api-key"

```

### 5. Menjalankan Development Server

```bash
npm run dev

```

Buka `http://localhost:5173` di browser Anda untuk melihat aplikasi beroperasi.

```