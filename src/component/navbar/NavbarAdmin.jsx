import { NavLink } from 'react-router-dom';
import {
    Package,
    ClipboardList,
    AlertTriangle,
    User
} from 'lucide-react';
import LogoPPM from '../../assets/logo_ppm.png';
import { useAuth } from "../../auth_context/AuthContext";
import LogoutLogic from '../../logic/auth_logic/logout/LogoutLogic';

export default function NavbarAdmin() {
    const menuItems = [
        { path: '/portal-akses-admin-web-sarpras-afm/barang', label: 'Barang', icon: Package },
        { path: '/portal-akses-admin-web-sarpras-afm/peminjaman', label: 'Peminjaman', icon: ClipboardList },
        { path: '/portal-akses-admin-web-sarpras-afm/laporan-kerusakan', label: 'Lapor Kerusakan', icon: AlertTriangle },
    ];

    const { admin } = useAuth();
    const { handleLogout } = LogoutLogic();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 flex items-center justify-center">
                            <img src={LogoPPM} />
                        </div>
                        <span className="font-bold text-xl text-brand-dark hidden sm:block">
                            SARPRAS PPM AFM
                        </span>
                    </div>

                    <nav className="flex gap-1 sm:gap-4">
                        {menuItems.map((menu) => {
                            const IconComponent = menu.icon;

                            return (
                                <NavLink
                                    key={menu.path}
                                    to={menu.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${isActive
                                            ? 'text-brand-light bg-brand-primary' // Style jika halaman aktif
                                            : 'text-gray-600 hover:text-brand-primary hover:bg-brand-light' // Style default
                                        }`
                                    }
                                >
                                    <IconComponent size={18} />
                                    <span className="hidden sm:block">{menu.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className='flex gap-6'>
                        <p className="flex items-center gap-1 text-brand-dark">
                            <User size={18} />
                            <span className="hidden sm:block font-bold">{admin?.username}</span>
                        </p>

                        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md text-brand-dark underline font-medium">
                            <span className="hidden sm:block">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}