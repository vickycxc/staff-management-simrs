import React, { useState, useEffect } from 'react';
import { 
    User, Lock, Palette, LogOut, Camera, Sun, Moon, X 
} from 'lucide-react';

// --- MOCK MODAL (Use this or import your own Modal component) ---
const Modal = ({ isOpen, onClose, title, children, large }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full overflow-hidden flex flex-col max-h-[90vh] ${large ? 'max-w-4xl' : 'max-w-2xl'}`}>
                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700 shrink-0">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-hidden flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const UserSettingsModal = ({ isOpen, onClose, user, onLogout, currentTheme, onThemeChange }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [tempUser, setTempUser] = useState({ name: 'Admin HR', email: 'admin@rs.com' });

    // Update local state when user prop changes
    useEffect(() => {
        if (user) {
            setTempUser(user);
        }
    }, [user]);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Pengaturan Akun" large={false}>
            <div className="flex h-[400px] flex-col md:flex-row">
                {/* SIDEBAR NAVIGATION */}
                <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700 p-4">
                    <nav className="space-y-1">
                        {['profile', 'security', 'theme'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition capitalize 
                                    ${activeTab === tab 
                                        ? 'bg-white dark:bg-gray-700 text-[#17B8A5] shadow-sm' 
                                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400'}`}
                            >
                                {tab === 'profile' ? <User size={18}/> : tab === 'security' ? <Lock size={18}/> : <Palette size={18}/>} 
                                {tab === 'theme' ? 'Tampilan' : tab === 'security' ? 'Keamanan' : 'Profil Saya'}
                            </button>
                        ))}
                    </nav>
                    <div className="mt-auto pt-8">
                        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                            <LogOut size={18}/> Keluar Aplikasi
                        </button>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-800">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center gap-6">
                                <div className="relative group cursor-pointer">
                                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-300">
                                        {tempUser.name ? tempUser.name.charAt(0).toUpperCase() : 'A'}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <Camera className="text-white" size={20}/>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white">Ganti Foto Profil</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG maks 2MB</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Nama Lengkap</label>
                                    <input 
                                        value={tempUser.name} 
                                        onChange={e => setTempUser({...tempUser, name: e.target.value})} 
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:border-[#17B8A5]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Email</label>
                                    <input 
                                        value={tempUser.email} 
                                        onChange={e => setTempUser({...tempUser, email: e.target.value})} 
                                        className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:border-[#17B8A5]"
                                    />
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-[#17B8A5] text-white rounded-lg font-bold hover:bg-[#139a8a] transition-colors">
                                Simpan
                            </button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Password Lama</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Password Baru</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:border-[#17B8A5]"/>
                            </div>
                            <button className="px-4 py-2 bg-[#17B8A5] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-[#139a8a] transition-colors">
                                Update Password
                            </button>
                        </div>
                    )}

                    {activeTab === 'theme' && (
                        <div className="space-y-6 animate-fade-in">
                            <h4 className="text-gray-800 dark:text-white font-bold">Tema Aplikasi</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div 
                                    onClick={() => onThemeChange('light')} 
                                    className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center gap-2 transition 
                                        ${currentTheme === 'light' 
                                            ? 'border-[#17B8A5] bg-blue-50 dark:bg-gray-700' 
                                            : 'border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'}`}
                                >
                                    <Sun className="text-orange-400" size={32}/>
                                    <span className="font-bold text-sm dark:text-white">Terang</span>
                                </div>
                                <div 
                                    onClick={() => onThemeChange('dark')} 
                                    className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center gap-2 transition 
                                        ${currentTheme === 'dark' 
                                            ? 'border-[#17B8A5] bg-gray-800' 
                                            : 'border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'}`}
                                >
                                    <Moon className="text-indigo-400" size={32}/>
                                    <span className="font-bold text-sm dark:text-white">Gelap</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

// CRITICAL: This export default was missing
export default UserSettingsModal;