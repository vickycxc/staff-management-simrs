import React, { useState, useEffect } from 'react';
import {
    Search, Filter, ChevronDown, MoreVertical,
    Eye, Edit, Trash2, User, Briefcase, FileText,
    Check, X, Mail, Phone, MapPin, Plus,
    LayoutDashboard, Users, UserPlus, Settings,
    LogOut, Bell, Menu, Camera, Lock, Palette, Sun, Moon, Upload, CheckCircle
} from 'lucide-react';

// --- DATA DUMMY ---
const INITIAL_STAFF = [
    { id: 1, name: "dr. Sarah Connor", category: "Medis", unit: "IGD", role: "Dokter Umum", status: "Tetap", phone: "081234567890", email: "sarah@rs.com", joinDate: "2023-01-15" },
    { id: 2, name: "Budi Santoso, S.Kep", category: "Keperawatan", unit: "Rawat Inap Lt.1", role: "Kepala Ruangan", status: "Tetap", phone: "081987654321", email: "budi@rs.com", joinDate: "2021-03-10" },
    { id: 3, name: "Siti Aminah, Amd.Keb", category: "Keperawatan", unit: "Poli Kebidanan", role: "Bidan Pelaksana", status: "Kontrak", phone: "081298761234", email: "siti@rs.com", joinDate: "2023-06-01" },
    { id: 4, name: "Andi Pratama, S.Kom", category: "Non-Medis", unit: "IT Support", role: "IT Staff", status: "Mitra", phone: "085678901234", email: "andi@rs.com", joinDate: "2022-11-20" },
    { id: 5, name: "dr. Strange", category: "Medis", unit: "Poli Bedah", role: "Dokter Spesialis", status: "Mitra", phone: "081234560000", email: "strange@rs.com", joinDate: "2020-05-05" },
];

const JOB_CATEGORIES = ['All', 'Medis', 'Keperawatan', 'Penunjang', 'Non-Medis'];

// --- COMPONENTS ---

// 1. MODAL COMPONENT (Reusable & Cantik)
const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${maxWidth} flex flex-col max-h-[90vh] overflow-hidden transform transition-all scale-100`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-700 shrink-0">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-0 overflow-y-auto custom-scrollbar flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

// 2. SIDEBAR NAVIGATION
const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen, onOpenSettings }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'directory', label: 'Direktori Pegawai', icon: Users },
        { id: 'add-staff', label: 'Input Pegawai', icon: UserPlus },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-indigo-600/30 shadow-lg">
                    <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="font-bold text-xl text-gray-800 dark:text-white tracking-tight">HRIS <span className="text-indigo-600">Pro</span></span>
            </div>

            <div className="p-4 space-y-1 flex-1 overflow-y-auto">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => { setActivePage(item.id); setIsMobileOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            activePage === item.id 
                            ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-200 dark:ring-gray-600' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900'
                        }`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
                <button 
                    onClick={onOpenSettings}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <Settings size={20} />
                    Pengaturan
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in" onClick={() => setIsMobileOpen(false)} />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar (Static) */}
            <aside className="hidden lg:block w-64 h-full shrink-0">
                <SidebarContent />
            </aside>
        </>
    );
};

// 3. PAGE: DIRECTORY
const DirectoryPage = ({ staffData, onDelete }) => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredData = staffData.filter(staff =>
        (filter === 'All' || staff.category === filter) &&
        (staff.name.toLowerCase().includes(search.toLowerCase()) ||
         staff.unit.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama atau unit..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-indigo-300 transition-colors"
                        >
                            {JOB_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.map((staff) => (
                    <div key={staff.id} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ring-4 ring-opacity-20 transition-all
                                    ${staff.category === 'Medis' ? 'bg-blue-50 text-blue-600 ring-blue-500' : 
                                      staff.category === 'Keperawatan' ? 'bg-pink-50 text-pink-600 ring-pink-500' : 
                                      'bg-emerald-50 text-emerald-600 ring-emerald-500'}`}>
                                    {staff.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 text-lg">{staff.name}</h3>
                                    <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        {staff.category}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => onDelete(staff.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                <Briefcase size={18} className="text-indigo-400" />
                                <span>{staff.role}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                <MapPin size={18} className="text-indigo-400" />
                                <span>{staff.unit}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                <Phone size={18} className="text-indigo-400" />
                                <span>{staff.phone}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-3 flex items-center justify-between">
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border 
                                ${staff.status === 'Tetap' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                                {staff.status}
                            </span>
                            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:gap-2 transition-all">
                                Detail <ChevronDown size={14} className="-rotate-90" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredData.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <Search size={40} className="text-gray-400"/>
                    </div>
                    <p className="text-gray-500 font-medium">Tidak ada pegawai ditemukan</p>
                    <p className="text-sm text-gray-400">Coba kata kunci pencarian lain</p>
                </div>
            )}
        </div>
    );
};

// 4. PAGE: ADD STAFF FORM
const StaffFormPage = ({ onAdd }) => {
    const [formData, setFormData] = useState({ name: '', role: '', unit: '', category: 'Medis', phone: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({ ...formData, id: Date.now(), status: 'Kontrak' });
        alert('Pegawai berhasil ditambahkan!');
        setFormData({ name: '', role: '', unit: '', category: 'Medis', phone: '' });
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300 pb-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20"><UserPlus size={24}/></div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Input Pegawai Baru</h2>
                            <p className="text-gray-500 text-sm">Lengkapi formulir di bawah ini dengan data yang valid.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="font-bold text-gray-800 dark:text-white border-b pb-2 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">1</span>
                            Identitas Dasar
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
                            <input 
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="Contoh: dr. Budi Santoso"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nomor Telepon</label>
                            <input 
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                placeholder="08..."
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="font-bold text-gray-800 dark:text-white border-b pb-2 flex items-center gap-2">
                             <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs">2</span>
                            Posisi & Penempatan
                        </h3>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kategori</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                >
                                    {JOB_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16}/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Unit Kerja</label>
                            <input 
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                value={formData.unit}
                                onChange={e => setFormData({...formData, unit: e.target.value})}
                                placeholder="Contoh: IGD, Rawat Inap"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Jabatan / Role</label>
                            <input 
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                value={formData.role}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                                placeholder="Contoh: Kepala Ruangan"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center gap-2 transform hover:-translate-y-0.5">
                            <CheckCircle size={20}/> Simpan Data Pegawai
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// 5. SETTINGS MODAL
const UserSettingsModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Pengaturan Akun" maxWidth="max-w-2xl">
            <div className="flex flex-col md:flex-row h-[500px] md:h-[450px]">
                {/* Sidebar Tab */}
                <div className="w-full md:w-1/3 border-r border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4">
                    <nav className="space-y-2">
                        {[
                            { id: 'profile', label: 'Profil Saya', icon: User },
                            { id: 'security', label: 'Keamanan', icon: Lock },
                            { id: 'theme', label: 'Tampilan', icon: Palette }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                    activeTab === tab.id 
                                    ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm ring-1 ring-gray-100 dark:ring-gray-700' 
                                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 bg-white dark:bg-gray-800 overflow-y-auto">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 relative group cursor-pointer overflow-hidden ring-4 ring-indigo-50">
                                    <span>AH</span>
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                        <Camera className="text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">Admin HR</h4>
                                    <p className="text-gray-500 text-sm">admin@rs-sehat.com</p>
                                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mt-1 inline-block">Super Admin</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="label-text">Nama Lengkap</label>
                                    <input className="input-field" defaultValue="Admin HR" />
                                </div>
                                <div>
                                    <label className="label-text">Email</label>
                                    <input className="input-field" defaultValue="admin@rs-sehat.com" />
                                </div>
                            </div>
                            <button className="btn-primary w-full">Simpan Perubahan</button>
                        </div>
                    )}
                    
                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="label-text">Password Lama</label>
                                    <input type="password" class="input-field" placeholder="••••••" />
                                </div>
                                <div>
                                    <label className="label-text">Password Baru</label>
                                    <input type="password" class="input-field" placeholder="••••••" />
                                </div>
                            </div>
                            <button className="btn-primary w-full">Update Password</button>
                        </div>
                    )}

                    {activeTab === 'theme' && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Mode Aplikasi</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border-2 border-indigo-500 bg-indigo-50 dark:bg-gray-700 p-4 rounded-xl cursor-pointer flex flex-col items-center gap-2">
                                    <Sun className="text-orange-500" size={32} />
                                    <span className="font-bold text-indigo-900 dark:text-white">Terang</span>
                                </div>
                                <div className="border border-gray-200 hover:border-indigo-300 p-4 rounded-xl cursor-pointer flex flex-col items-center gap-2 transition-all">
                                    <Moon className="text-gray-400" size={32} />
                                    <span className="font-medium text-gray-500">Gelap</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Styles for Settings Modal internal use */}
            <style jsx>{`
                .label-text { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.5rem; }
                .input-field { width: 100%; padding: 0.6rem 1rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; outline: none; transition: all; background-color: white; }
                .input-field:focus { ring: 2px solid #6366f1; border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
                .btn-primary { padding: 0.75rem 1rem; background-color: #4f46e5; color: white; font-weight: bold; border-radius: 0.75rem; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }
                .btn-primary:hover { background-color: #4338ca; transform: translateY(-1px); }
                .btn-primary:active { transform: translateY(0); }
            `}</style>
        </Modal>
    );
}

// --- MAIN APP LAYOUT ---

export default function App() {
    const [activePage, setActivePage] = useState('directory');
    const [staffData, setStaffData] = useState(INITIAL_STAFF);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleDelete = (id) => {
        if(window.confirm('Yakin ingin menghapus data ini?')) {
            setStaffData(prev => prev.filter(s => s.id !== id));
        }
    }

    const handleAdd = (newStaff) => {
        setStaffData(prev => [newStaff, ...prev]);
        setActivePage('directory');
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar 
                activePage={activePage} 
                setActivePage={setActivePage} 
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                onOpenSettings={() => setIsSettingsOpen(true)}
            />

            {/* Main Content Wrapper */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
                
                {/* Mobile Header (Fixed Top) */}
                <header className="lg:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-20 shrink-0">
                    <button onClick={() => setIsMobileOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg">HRIS Pro</span>
                    <button className="p-2 text-gray-600 relative">
                         <Bell size={24} />
                         <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </header>

                {/* Scrollable Content Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                    {activePage === 'dashboard' && 'Dashboard Overview'}
                                    {activePage === 'directory' && 'Direktori Pegawai'}
                                    {activePage === 'add-staff' && 'Tambah Pegawai'}
                                </h1>
                                <p className="text-gray-500 mt-1 text-sm md:text-base">
                                    {activePage === 'dashboard' && 'Ringkasan statistik kepegawaian & performa hari ini.'}
                                    {activePage === 'directory' && `Mengelola data ${staffData.length} pegawai aktif dalam sistem.`}
                                    {activePage === 'add-staff' && 'Pastikan seluruh form wajib diisi dengan benar.'}
                                </p>
                            </div>

                            {/* Desktop Top Right Actions */}
                            <div className="hidden md:flex items-center gap-4">
                                <button className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-indigo-600 relative transition-all hover:shadow-md">
                                    <Bell size={20} />
                                    <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                                </button>
                                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Admin HR</p>
                                        <p className="text-xs text-gray-500">Super Admin</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-200 dark:border-gray-600 overflow-hidden shadow-sm">
                                        <img src="https://ui-avatars.com/api/?name=Admin+HR&background=6366f1&color=fff" alt="Admin" className="w-full h-full object-cover"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page Content Switcher */}
                        {activePage === 'dashboard' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 pb-10">
                                {[
                                    { title: 'Total Pegawai', value: staffData.length, color: 'bg-blue-500', icon: Users },
                                    { title: 'Pegawai Masuk', value: '12', color: 'bg-emerald-500', icon: UserPlus },
                                    { title: 'Izin / Cuti', value: '3', color: 'bg-orange-500', icon: FileText },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:shadow-md transition-shadow">
                                        <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-${stat.color}/30`}>
                                            <stat.icon size={28} />
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                                        </div>
                                    </div>
                                ))}
                                <div className="md:col-span-3 bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-600/30">
                                    <div className="relative z-10 max-w-2xl">
                                        <h3 className="text-3xl font-bold mb-3">Selamat Pagi, Admin! 👋</h3>
                                        <p className="opacity-90 text-indigo-100 text-lg leading-relaxed mb-8">
                                            Sistem mendeteksi ada 3 pengajuan cuti baru yang menunggu persetujuan dan 1 jadwal interview kandidat dokter umum jam 10:00 WIB nanti.
                                        </p>
                                        <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-sm hover:bg-indigo-50 transition-all transform hover:-translate-y-1">
                                            Lihat Aktivitas Terbaru
                                        </button>
                                    </div>
                                    <div className="absolute -right-10 -bottom-10 opacity-10">
                                        <LayoutDashboard size={350} />
                                    </div>
                                    {/* Abstract shapes */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
                                </div>
                            </div>
                        )}

                        {activePage === 'directory' && <DirectoryPage staffData={staffData} onDelete={handleDelete} />}
                        {activePage === 'add-staff' && <StaffFormPage onAdd={handleAdd} />}
                    </div>
                </div>
            </main>

            {/* Modals */}
            <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    );
}