import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, LogIn } from 'lucide-react';
import LoginLogic from '../../logic/auth_logic/login/LoginLogic';

export default function Login() {
    const { handleLogin, email, setEmail, password, setPassword, loading } = LoginLogic();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors mb-6 w-fit"
                >
                    <ArrowLeft size={16} />
                    Kembali ke Beranda
                </Link>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-2xl sm:px-10 border-2 border-gray-300">
                    <div className="mb-8">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
                            Masuk ke Sistem
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Khusus untuk admin divisi sarpras
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Alamat Email
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary border outline-none transition-shadow"
                                    placeholder="admin@asrama.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Kata Sandi
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border-gray-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary border outline-none transition-shadow"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                            >
                                <LogIn size={18} />
                                {loading ? "Memproses..." : "Masuk"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}