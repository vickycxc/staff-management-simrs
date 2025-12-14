import React, { useState } from 'react';
import { 
    Activity, Eye, EyeOff, Lock, Mail, User, 
    CheckCircle, AlertCircle, LogOut 
} from 'lucide-react';

// ==========================================
// 1. GLOBAL STYLES 
// (Digunakan untuk Font & Animasi custom tanpa file CSS terpisah)
// ==========================================
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap');
        
        body { 
            font-family: 'Noto Sans', sans-serif; 
            background-color: #F7F7F7; 
        }
        
        /* Animations */
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Background Pattern for Sidebar */
        .bg-pattern {
            background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
    `}</style>
);

// ==========================================
// 2. KOMPONEN UI (Sidebar & Input)
// ==========================================

const BrandSidebar = () => (
    <div className="hidden lg:flex w-1/2 bg-[#17B8A5] relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-30"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-teal-900 opacity-20 rounded-full blur-2xl"></div>

        {/* Logo Section */}
        <div className="relative z-10 flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg text-[#17B8A5]">
                <Activity size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">SIMRS <span className="font-light opacity-90">HR</span></h1>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Sistem Kepegawaian <br/> Rumah Sakit.</h2>
            <p className="text-teal-50 text-lg font-light max-w-md">
                Kelola akses masuk staf medis dan administrasi dengan aman dan terintegrasi.
            </p>
        </div>

        {/* Footer Text */}
        <div className="relative z-10 text-xs opacity-60">&copy; 2024 SIMRS HR System.</div>
    </div>
);

const InputField = ({ label, type, placeholder, icon: Icon, value, onChange }) => {
    const [showPass, setShowPass] = useState(false);
    const isPassword = type === 'password';
    
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#17B8A5] transition-colors">
                    <Icon size={18} />
                </div>
                <input 
                    type={isPassword && showPass ? 'text' : type}
                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17B8A5] bg-gray-50 focus:bg-white text-sm transition-all"
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700">
                        {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                    </button>
                )}
            </div>
        </div>
    );
};

// ==========================================
// 3. LOGIC UTAMA (Halaman Login/Register)
// ==========================================

const AuthPage = ({ onLogin, registeredUsers, setRegisteredUsers }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setIsLoading(true);

        // Simulasi loading network (1 detik)
        setTimeout(() => {
            // 1. Validasi Umum
            if (!formData.email || !formData.password) {
                setError('Harap isi email dan password.'); 
                setIsLoading(false); return;
            }

            if (isRegister) {
                // --- LOGIKA REGISTER ---
                if (!formData.name) {
                    setError('Nama Lengkap wajib diisi.'); setIsLoading(false); return;
                }
                if (formData.password.length < 6) {
                    setError('Password minimal 6 karakter.'); setIsLoading(false); return;
                }
                if (formData.password !== formData.confirmPassword) {
                    setError('Konfirmasi password tidak cocok.'); setIsLoading(false); return;
                }

                // Cek duplikasi email di "database"
                const existingUser = registeredUsers.find(u => u.email === formData.email);
                if (existingUser) {
                    setError('Email ini sudah terdaftar. Silakan login.'); setIsLoading(false); return;
                }

                // Simpan User Baru
                const newUser = { name: formData.name, email: formData.email, password: formData.password };
                setRegisteredUsers([...registeredUsers, newUser]);
                
                setSuccessMsg("Registrasi Berhasil! Silakan masuk.");
                setIsRegister(false); // Pindah ke mode login
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
                setIsLoading(false);

            } else {
                // --- LOGIKA LOGIN ---
                const foundUser = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);

                if (foundUser) {
                    setIsLoading(false);
                    onLogin({ name: foundUser.name, email: foundUser.email }); // Panggil fungsi parent untuk set user aktif
                } else {
                    setError('Email atau password salah.');
                    setIsLoading(false);
                }
            }
        }, 1000);
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setError('');
        setSuccessMsg('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen flex w-full bg-white lg:bg-[#F7F7F7]">
            {/* Sidebar Branding */}
            <BrandSidebar />

            {/* Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white animate-fade-in">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-800">{isRegister ? 'Buat Akun Baru' : 'Selamat Datang'}</h2>
                        <p className="text-gray-500 mt-2">{isRegister ? 'Lengkapi data untuk akses SIMRS.' : 'Masuk untuk mengakses dashboard.'}</p>
                    </div>

                    {/* Notifikasi Error / Sukses */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100 animate-fade-in">
                            <AlertCircle className="shrink-0 mt-0.5" size={16}/> <span>{error}</span>
                        </div>
                    )}
                    {successMsg && (
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm flex items-start gap-3 border border-green-100 animate-fade-in">
                            <CheckCircle className="shrink-0 mt-0.5" size={16}/> <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Form Input */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isRegister && (
                            <InputField 
                                label="Nama Lengkap" type="text" placeholder="Contoh: dr. Budi Santoso" icon={User} 
                                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                            />
                        )}
                        <InputField 
                            label="Email" type="email" placeholder="nama@rs.com" icon={Mail} 
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                        <InputField 
                            label="Password" type="password" placeholder="Minimal 6 karakter" icon={Lock} 
                            value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                        />
                        {isRegister && (
                            <InputField 
                                label="Konfirmasi Password" type="password" placeholder="Ulangi password" icon={CheckCircle} 
                                value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                            />
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full bg-[#17B8A5] hover:bg-[#129485] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 
                                    Memproses...
                                </span>
                            ) : (isRegister ? 'Daftar Sekarang' : 'Masuk Dashboard')}
                        </button>
                    </form>

                    {/* Switch Login/Register */}
                    <div className="text-center pt-4 border-t border-gray-100 mt-6">
                        <p className="text-sm text-gray-600">
                            {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
                            <button onClick={toggleMode} className="text-[#17B8A5] font-bold hover:underline transition-colors ml-1">
                                {isRegister ? 'Masuk sekarang' : 'Daftar di sini'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// 4. APP (Induk Component)
// ==========================================
const App = () => {
    const [user, setUser] = useState(null);
    
    // Database Mock (Default User Admin)
    const [registeredUsers, setRegisteredUsers] = useState([
        { name: "Admin Utama", email: "admin@rs.com", password: "password123" }
    ]);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="antialiased text-gray-900">
            <GlobalStyles />
            {!user ? (
                // 1. Tampilkan Halaman Auth jika belum login
                <AuthPage 
                    onLogin={handleLogin} 
                    registeredUsers={registeredUsers} 
                    setRegisteredUsers={setRegisteredUsers} 
                />
            ) : (
                // 2. Tampilan Sederhana Setelah Login Sukses
                <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 animate-fade-in">
                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Login Berhasil!</h1>
                        <p className="text-gray-600 mt-2">Selamat datang, <span className="font-semibold text-[#17B8A5]">{user.name}</span></p>
                        <p className="text-sm text-gray-400 mt-1">{user.email}</p>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                                <LogOut size={18}/> Keluar (Logout)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;