// src/components/sidebar.jsx
import React from 'react';
import { LayoutDashboard, Users, UserPlus, Activity } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard Eksekutif', icon: LayoutDashboard },
        { id: 'directory', label: 'Direktori & Shift', icon: Users },
        { id: 'crud', label: 'Input Data SDM', icon: UserPlus },
        { id: 'performance', label: 'Evaluasi Kinerja', icon: Activity },
    ];

    return (
        <>
            {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar}></div>}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0 border-r border-gray-100`}>
                <div className="flex items-center justify-center h-20 border-b border-gray-100 bg-white">
                    <h1 className="text-2xl font-bold text-[#17B8A5]">SIMRS<span className="text-gray-800">HR</span></h1>
                </div>
                <nav className="mt-8 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 768) toggleSidebar();
                            }}
                            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                                activeTab === item.id ? 'bg-[#17B8A5] text-white shadow-md font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#17B8A5]'
                            }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            <span className="text-left">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">AD</div>
                        <div>
                            <p className="text-sm font-bold text-gray-700">Admin HR</p>
                            <p className="text-xs text-gray-400">Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;