# 🏫 SARPRAS PPM AFM - AI-Integrated Asset & Facility Management

Aplikasi Single Page Application (SPA) modern untuk sistem manajemen sarana, prasarana, dan peminjaman barang di lingkungan asrama (PPM). Sistem ini dirancang dengan fokus pada efisiensi operasional, pelacakan aset real-time, dan inovasi integrasi **Google Gemini AI** via Supabase Edge Functions untuk validasi otomatis laporan kerusakan.

Dibangun dengan arsitektur yang memisahkan _Server State_ (sinkronisasi API & caching) dan _Client State_ (UI/interaksi pengguna) guna menghasilkan performa yang cepat, _maintainable_, dan tangguh (_resilient_) terhadap kegagalan jaringan.

## 🚀 Teknologi yang Digunakan

**Core & State Management:**

- **React (Vite):** Framework utama dengan build tool Vite untuk _Hot Module Replacement (HMR)_ yang super cepat dan optimasi _build_ produksi.
- **TanStack Query (React Query):** Digunakan sebagai _Server State Management_ untuk _data fetching_, _caching_, sinkronisasi, dan optimasi _request_ ke Supabase.

**Styling & UI Components:**

- **Tailwind CSS:** _Utility-first CSS framework_ untuk _styling_ yang responsif dan konsisten.
- **Lucide React:** Koleksi ikon SVG modern, konsisten, dan ringan.
- **React Hot Toast:** Sistem notifikasi interaktif untuk memberikan _feedback_ visual instan kepada pengguna dengan _dynamic error unwrapping_.

**Backend & Integrasi AI (BaaS):**

- **Supabase:** Mengelola database PostgreSQL, autentikasi, dan _Row Level Security_ (RLS).
- **Supabase Edge Functions (Deno):** Menjalankan _serverless backend logic_ dengan _Exponential Backoff Retry_ untuk menahan lonjakan _traffic_ AI.
- **Google Gemini AI:** Ekstraksi data _natural language_ dan rekomendasi teknis menggunakan model _Flash_ yang dioptimalkan untuk respons berlatensi rendah.

## ✨ Fitur Utama

Aplikasi ini dibagi menjadi dua antarmuka utama berdasarkan _Role-Based Access Control_:

### 👤 Halaman Publik (Pengguna / Santri)

- **Katalog Peminjaman Publik:** Menampilkan daftar barang yang tersedia untuk dipinjam secara _real-time_.
- **Laporan Kerusakan Terintegrasi AI:** Form pelaporan cerdas di mana keluhan pengguna dianalisis secara otomatis oleh AI untuk mengekstrak kode barang, menentukan tingkat urgensi (_Low/Medium/High_), dan memberikan rekomendasi teknis awal. Sistem dilengkapi proteksi _Zero-Trust Input_ untuk mencegah _Token Drain_ dan _Prompt Injection_.

### 🛡️ Dashboard Admin

- **Manajemen Master Barang (CRUD):** Antarmuka terpusat untuk mendata entitas barang utama.
- **Manajemen Stok Dinamis:** Pelacakan unit fisik secara individual dengan kontrol status (_Tersedia, Dipinjam, Rusak, Sedang Diperbaiki_).
- **Manajemen Peminjaman:** Sistem sirkulasi aset dengan fungsi _checkout_ dan pembaruan status pengembalian (dikembalikan secara normal atau ditandai _hilang_).
- **Resolusi Laporan Kerusakan:** Panel untuk meninjau hasil ekstraksi AI dan mengeksekusi tindakan perbaikan fisik berdasarkan laporan publik.

## 📸 Tangkapan Layar (Screenshots)

### Halaman Peminjaman Publik 
![Halaman Peminjaman Publik](/src/assets/doc_github/peminjaman-publik.png)

### Form Laporan Kerusakan Publik (AI Powered)
![Form Laporan Kerusakan Publik (AI Powered)](/src/assets//doc_github/laporan-kerusakan-publik.png)

### Dashboard Admin - Manajemen Barang
![Dashboard Admin - Manajemen Barang)](/src/assets/doc_github/manajemen-barang-admin.png)

### Dashboard Admin - Manajemen Stok Barang
![Dashboard Admin - Manajemen Stok Barang](/src/assets/doc_github/manajemen-stok-barang-admin.png)

### Dashboard Admin - Manajemen Peminjaman
![Dashboard Admin - Manajemen Peminjaman](/src/assets/doc_github/manajemen-peminjaman-admin.png)

### Dashboard Admin - Laporan Kerusakan & Analisis AI
![Dashboard Admin - Laporan Kerusakan & Analisis AI](/src/assets/doc_github/manajemen-laporan-kerusakan-admin.png)

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

Buat file `.env` di _root directory_ proyek dan masukkan kredensial Supabase Anda. Kunci ini aman terekspos di frontend berkat pengamanan _Row Level Security_ (RLS) di sisi database.

```env
VITE_SUPABASE_URL=[https://your-project-id.supabase.co](https://your-project-id.supabase.co)
VITE_SUPABASE_ANON_KEY=your-anon-key-here

```

### 4. Konfigurasi Edge Functions & Supabase Secrets (Backend)

Untuk menjalankan integrasi AI secara aman, kredensial harus disimpan di level _Serverless_. Gunakan Supabase CLI:

```bash
supabase secrets set GEMINI_API_KEY="your-google-gemini-api-key"

```

### 5. Menjalankan Development Server

```bash
npm run dev

```

Buka `http://localhost:5173` di browser Anda untuk melihat aplikasi beroperasi.
