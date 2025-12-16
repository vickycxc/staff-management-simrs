import { Mail, Lock, ArrowRight } from 'lucide-react';
const LoginPage = ({ onLogin, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate network request
        setTimeout(() => {
            setLoading(false);
            onLogin(email);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 animate-fade-in transition-colors">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-[#17B8A5] p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-y-6 transform origin-bottom-left"></div>
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                            <Lock className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">SIMRS<span className="text-teal-900 opacity-60">HR</span></h1>
                        <p className="text-teal-50 text-sm font-medium">Sistem Informasi Manajemen SDM</p>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Selamat Datang Kembali!</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Silakan masuk untuk mengakses akun Anda.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2 ml-1">Email / ID Pegawai</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-[#17B8A5] focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all outline-none"
                                    placeholder="contoh@rs.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-[#17B8A5] focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-xs font-medium text-[#17B8A5] hover:text-teal-700 transition">Lupa Password?</a>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#17B8A5] hover:bg-[#0F8F80] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Memproses...</>
                            ) : (
                                <>Masuk <ArrowRight size={20}/></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Belum punya akun?{' '}
                            <button onClick={onSwitchToRegister} className="text-[#17B8A5] font-bold hover:underline">
                                Daftar Sekarang
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};