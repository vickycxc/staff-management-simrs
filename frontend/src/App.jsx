import React, { useState } from 'react';

// Import Components
import Sidebar from './components/Sidebar';
import UserSettingsModal from './components/UserSettingsModal'; // Jika dipisah

// Import Pages
import DashboardPage from './pages/DashboardPage';
import DirectoryPage from './pages/DirectoryPage';
import StaffFormPage from './pages/StaffFormPage';
import PerformancePage from './pages/PerformancePage';
import SmartHRAssistant from './pages/SmartHRAssistant';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Import Data
import { INITIAL_DATA } from './constants/data';

export default function App() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authPage, setAuthPage] = useState('login'); 

    // App State
    const [activeTab, setActiveTab] = useState('dashboard');
    const [staffData, setStaffData] = useState(INITIAL_DATA);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleUpdateStaff = (updatedStaff) => { 
        setStaffData(staffData.map(s => s.id === updatedStaff.id ? updatedStaff : s)); 
    };
    
    const handleDelete = (id) => { 
        if (confirm('Hapus data pegawai ini?')) setStaffData(staffData.filter(s => s.id !== id)); 
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
        setActiveTab('dashboard');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setAuthPage('login');
    };

    // Render Auth Pages
    if (!isAuthenticated) {
        return (
            <div className="transition-colors duration-300">
                {authPage === 'login' ? (
                    <LoginPage onLogin={handleLogin} onSwitch={() => setAuthPage('register')} />
                ) : (
                    <RegisterPage onRegister={handleLogin} onSwitch={() => setAuthPage('login')} />
                )}
            </div>
        );
    }

    // Render Main App
    return (
        <div className="flex min-h-screen font-sans pl-64 bg-[#F7F7F7] dark:bg-gray-900 transition-colors">
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onOpenSettings={() => setIsSettingsOpen(true)}
                onLogout={handleLogout}
            />
            <main className="flex-1 p-8 h-screen overflow-y-auto">
                {activeTab === 'dashboard' && <DashboardPage staffData={staffData} />}
                {activeTab === 'directory' && <DirectoryPage staffData={staffData} onDelete={handleDelete} onUpdate={handleUpdateStaff} />}
                {activeTab === 'crud' && <StaffFormPage onAddStaff={(s) => { setStaffData([...staffData, s]); setActiveTab('directory'); }} />}
                {activeTab === 'performance' && <PerformancePage staffData={staffData} />}
                {activeTab === 'assistant' && <SmartHRAssistant staffData={staffData} />}
            </main>
            <UserSettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                currentTheme={theme} 
                onThemeChange={handleThemeChange} 
                onLogout={handleLogout} 
            />
        </div>
    );
}
