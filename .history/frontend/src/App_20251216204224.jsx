import React, { useState } from 'react';
//import { INITIAL_DATA } from './data.js'; // Adjust path if data.js is in a different directory
//import Sidebar from './components/sidebar.jsx';
//import Dashboard from './pages/DashboardPage.jsx';
//import StaffDirectory from './pages/DirectoryPage.jsx';
//import StaffForm from './pages/StaffFormPage.jsx';
//import PerformanceModule from './pages/PerformancePage.jsx';
//import SmartHRAssistant from './components/SmartHRAssistant.jsx';
//import UserSettingsModal from './components/UserSettingsModal.jsx';
//import GlobalStyles from './components/GlobalStyles.jsx';
//import LoginPage from './pages/LoginPage.jsx';
//import RegisterPage from './pages/RegisterPage.jsx';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [staffData, setStaffData] = useState(INITIAL_DATA);   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authPage, setAuthPage] = useState('login'); // 'login' or 'register'

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleUpdateStaff = (updatedStaff) => { setStaffData(staffData.map(s => s.id === updatedStaff.id ? updatedStaff : s)); };
    const handleDelete = (id) => { if (confirm('Hapus data pegawai ini?')) setStaffData(staffData.filter(s => s.id !== id)); };

    const handleLogin = (email) => {
        console.log("Logged in with:", email);
        setIsAuthenticated(true);
    };

    const handleRegister = (name) => {
        console.log("Registered user:", name);
        // Automatically login after register for this demo
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        if(confirm("Apakah Anda yakin ingin keluar?")) {
            setIsAuthenticated(false);
            setIsSettingsOpen(false);
            setAuthPage('login');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="font-sans text-gray-900 dark:text-white transition-colors">
                <GlobalStyles />
                {authPage === 'login' ? (
                    <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setAuthPage('register')} />
                ) : (
                    <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setAuthPage('login')} />
                )}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen font-sans pl-64 bg-[#F7F7F7] dark:bg-gray-900 transition-colors">
            <GlobalStyles />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenSettings={() => setIsSettingsOpen(true)} />
            <main className="flex-1 p-8 h-screen overflow-y-auto">
                {activeTab === 'dashboard' && <Dashboard staffData={staffData} />}
                {activeTab === 'directory' && <StaffDirectory staffData={staffData} onDelete={handleDelete} onUpdate={handleUpdateStaff} />}
                {activeTab === 'crud' && <StaffForm onAddStaff={(s) => { setStaffData([...staffData, s]); setActiveTab('directory'); }} />}
                {activeTab === 'performance' && <PerformanceModule staffData={staffData} />}
                {activeTab === 'assistant' && <SmartHRAssistant staffData={staffData} />}
            </main>
            <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} currentTheme={theme} onThemeChange={handleThemeChange} onLogout={handleLogout} />
        </div>
    );
}