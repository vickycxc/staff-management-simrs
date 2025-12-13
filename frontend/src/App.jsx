// src/App.jsx
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/sidebar'; // Perhatikan huruf kecil sesuai screenshot
import DashboardPage from './pages/DashboardPage';
import DirectoryPage from './pages/DirectoryPage';
import StaffFormPage from './pages/StaffFormPage';
// Placeholder untuk page yang belum ada logikanya
import PerformancePage from './pages/PerformancePage'; 
import LoginPage from './pages/LoginPage';

import { INITIAL_DATA } from './constants/data';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [staffData, setStaffData] = useState(INITIAL_DATA);

  // Handlers
  const handleAddStaff = (newStaff) => setStaffData([...staffData, newStaff]);
  const handleDeleteStaff = (id) => setStaffData(staffData.filter(s => s.id !== id));
  const handleEditStaff = (updatedStaff) => { /* Logic update */ };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage staffData={staffData} />;
      case 'directory': return <DirectoryPage staffData={staffData} onDelete={handleDeleteStaff} onEdit={handleEditStaff} />;
      case 'crud': return <StaffFormPage onAddStaff={handleAddStaff} />;
      case 'performance': return <PerformancePage />;
      default: return <DashboardPage staffData={staffData} />;
    }
  };

  // Jika ingin implementasi Login, bungkus return di bawah dengan kondisi login state.

  return (
    <div className="flex h-screen bg-[#F7F7F7] overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-[#17B8A5]"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setSidebarOpen(false)} 
      />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;