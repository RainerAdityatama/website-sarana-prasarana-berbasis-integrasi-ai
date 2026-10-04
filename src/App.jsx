import { Route, Routes } from "react-router-dom"
import Home from "./public_page/Home"
import Login from "./auth_page/login/Login"
import ItemsAdmin from "./admin_page/item/Items"
import PeminjamanAdmin from "./admin_page/peminjaman/Peminjaman"
import LaporanKerusakan from "./admin_page/laporan_kerusakan/LaporanKerusakan"
import PrivateRoute from "./route_logic/PrivateRoute"
import GuestRoute from "./route_logic/GuestRoute"
import { Toaster } from "react-hot-toast"
import StokItemsPage from "./admin_page/item_stoks/StokItems"
import HalamanStokHilangItems from "./admin_page/item_stoks/StokHilangItems"
import HalamanPeminjamanPublic from "./public_page/PeminjamanPublic"
import HalamanPeminjamanManagementPublic from "./public_page/PeminjamanManagementPublic"
import HalamanLaporanKerusakanPublic from "./public_page/LaporanKerusakanPublic"
import DetailLaporanKerusakan from "./admin_page/laporan_kerusakan/DetailLaporanKerusakan"

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peminjaman" element={<HalamanPeminjamanPublic />} />
        <Route path="/peminjaman/:id" element={<HalamanPeminjamanManagementPublic />} />
        <Route path="/laporan-kerusakan" element={<HalamanLaporanKerusakanPublic />} />

        <Route element={<PrivateRoute />}>
          <Route path="/portal-akses-admin-web-sarpras-afm/barang" element={<ItemsAdmin />} />
          <Route path="/portal-akses-admin-web-sarpras-afm/barang/hilang" element={<HalamanStokHilangItems />} />
          <Route path="/portal-akses-admin-web-sarpras-afm/peminjaman" element={<PeminjamanAdmin />} />
          <Route path="/portal-akses-admin-web-sarpras-afm/laporan-kerusakan" element={<LaporanKerusakan />} />
          <Route path="/portal-akses-admin-web-sarpras-afm/laporan-kerusakan/detail/:id_laporan" element={<DetailLaporanKerusakan />} />
          <Route path="/portal-akses-admin-web-sarpras-afm/barang/stok/:id" element={<StokItemsPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/portal-web-sarpras-afm/masuk" element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App