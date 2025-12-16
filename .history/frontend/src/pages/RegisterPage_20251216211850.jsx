import { useState } from 'react';
import { User, Mail, Lock, UserPlus as UserPlusIcon } from 'lucide-react';

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onRegister(name);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 animate-fade-in transition-colors">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 pb-0">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        Buat Akun Baru
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Bergabung dengan sistem manajemen SDM kami.
                    </p>
                </div>

                <div className="p-8 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2 ml-1">
                                Nama Lengkap
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
                                    placeholder="Nama Lengkap Anda"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2 ml-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
                                    placeholder="email@rs.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2 ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
                                    placeholder="Buat password kuat"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-[#17B8A5] hover:bg-[#0F8F80] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"
                        >
                            {loading ? 'Mendaftarkan...' : <>Daftar Akun <UserPlusIcon size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sudah punya akun?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-[#17B8A5] font-bold hover:underline"
                            >
                                Login di sini
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
