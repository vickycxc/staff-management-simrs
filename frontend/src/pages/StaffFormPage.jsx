// src/pages/StaffFormPage.jsx
import React, { useState } from 'react';
import { UserPlus, ChevronRight } from 'lucide-react';
import { JOB_CATEGORIES, WORK_UNITS, REQUIRED_SIP_DOCS } from '../constants/data';

const StaffFormPage = ({ onAddStaff }) => {
    const [formData, setFormData] = useState({
        employeeId: '', name: '', role: '', unit: '', category: 'Dokter Umum', employeeType: 'Tetap',
        sipNumber: '', sipExpiry: '', gender: 'Laki-laki', phone: '', email: '', address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddStaff({ ...formData, id: Math.random(), joinDate: new Date().toISOString().split('T')[0], status: 'Active', currentShift: 'Libur' });
        alert("Data Tersimpan");
        // Reset form...
    };

    return (
        <div className="animate-fade-in bg-white p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-6">Input Data SDM Baru</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap</label>
                    <input className="w-full border rounded-lg px-4 py-2" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} required />
                </div>
                {/* Field lainnya sesuai kode sebelumnya... */}
                <div className="md:col-span-2">
                    <button type="submit" className="bg-[#17B8A5] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#129A8A]">Simpan Data</button>
                </div>
            </form>
        </div>
    );
};

export default StaffFormPage;