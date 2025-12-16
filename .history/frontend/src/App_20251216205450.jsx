import React, { useState } from 'react';
import { INITIAL_DATA } from './data';

// ====== IMPORT KOMPONEN ======
import Sidebar from './components/Sidebar';
import Dashboard from './pages/DashboardPage';
import StaffDirectory from './pages/DirectoryPage';
import StaffForm from './pages/StaffFormPage';
import PerformanceModule from './pages/PerformancePage';
import SmartHRAssistant from './components/SmartHRAssistant';
import UserSettingsModal from './components/UserSettingsModal';
import GlobalStyles from './components/GlobalStyles';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [staffData, setStaffData] = useState(INITIAL_DATA);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState('login'); // login | register

  // ====== HANDLERS ======
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleUpdateStaff = (updatedStaff) => {
    setStaffData(
      staffData.map((s) => (s.id === updatedStaff.id ? updatedStaff : s))
    );
  };

  const handleDelete = (id) => {
    if (confirm('Hapus data pegawai ini?')) {
      setStaffData(staffData.filter((s) => s.id !== id));
    }
  };

  const handleLogin = (email) => {
    console.log('Login:', email);
    setIsAuthenticated(true);
  };

  const handleRegister = (name) => {
    console.log('Register:', name);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      setIsAuthenticated(false);
      setIsSettingsOpen(false);
      setAuthPage('login');
    }
  };

  // ====== AUTH PAGE ======
  if (!isAuthenticated) {
    return (
      <div className="font-sans text-gray-900 dark:text-white transition-colors">
        <GlobalStyles />
        {authPage === 'login' ? (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthPage('register')}
          />
        ) : (
          <RegisterPage
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthPage('login')}
          />
        )}
      </div>
    );
  }

  // ====== MAIN APP ======
  return (
    <div className="flex min-h-screen font-sans pl-64 bg-[#F7F7F7] dark:bg-gray-900 transiti
