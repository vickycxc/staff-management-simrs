import { LayoutDashboard, Users, UserPlus, Activity, Bot } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenSettings }) {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen fixed left-0 top-0 z-50 transition-colors">
            
            <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-[#17B8A5]">
                    SIMRS<span className="text-gray-800 dark:text-white">HR</span>
                </h1>
            </div>

            <nav className="p-4 space-y-2 flex-1">
                {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'directory', icon: Users, label: 'Direktori & Shift' },
                    { id: 'crud', icon: UserPlus, label: 'Input Data SDM' },
                    { id: 'performance', icon: Activity, label: 'Evaluasi Kinerja' },
                    { id: 'assistant', icon: Bot, label: 'Asisten HR' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                        ${activeTab === item.id
                            ? 'bg-[#17B8A5] text-white shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div
                onClick={onOpenSettings}
                className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                        AD
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                            Admin HR
                        </p>
                        <p className="text-xs text-gray-400">
                            Pengaturan Akun
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
