import LogoPPM from '../../assets/logo_ppm.png';
import {
    Home as HomeIcon,
    Package,
    AlertTriangle,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function NavbarPublic() {
    const menuItems = [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/peminjaman', label: 'Peminjaman', icon: Package },
        { path: '/laporan-kerusakan', label: 'Lapor Kerusakan', icon: AlertTriangle },
    ];

    return (
        <>
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

                        <Link to="/portal-web-sarpras-afm/masuk" className="flex items-center gap-2 px-3 py-2 rounded-md text-brand-dark underline font-medium">
                            <span className="hidden sm:block">Login Admin Sarpras</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}